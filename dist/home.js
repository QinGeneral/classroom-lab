(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const catalog = window.CLASSROOM_CATALOG;
  const grades = new Map([['all', '全部年级']]);
  const stagePrefixes = new Map();
  const state = { grade: 'all', query: '' };
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }
  function arrow() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 24 24'); svg.setAttribute('aria-hidden', 'true');
    const path = document.createElementNS(svg.namespaceURI, 'path');
    path.setAttribute('d', 'M3 12h17m-7-7 7 7-7 7'); svg.append(path); return svg;
  }
  function chooseGrade(value, scroll) {
    state.grade = grades.has(value) ? value : 'all'; render();
    if (scroll && innerWidth <= 720) $('catalog').scrollIntoView({ behavior: reduced.matches ? 'instant' : 'smooth', block: 'start' });
  }
  for (const stage of catalog.stages) {
    const group = el('section', 'grade-group'); group.dataset.stage = stage.id;
    const heading = el('h2'); heading.style.margin = '0';
    const stageButton = el('button', 'stage-heading', stage.label);
    stageButton.type = 'button'; stageButton.dataset.grade = stage.prefix + '-all'; stageButton.setAttribute('aria-label', '浏览' + stage.label + '全部年级实验'); stageButton.setAttribute('aria-pressed', 'false');
    stageButton.addEventListener('click', () => chooseGrade(stageButton.dataset.grade, true)); heading.append(stageButton); group.append(heading);
    const buttons = el('div', 'grade-buttons');
    const options = document.createElement('optgroup'); options.label = stage.label;
    grades.set(stage.prefix + '-all', stage.label + '全部年级');
    stagePrefixes.set(stage.prefix, stage.id);
    options.append(new Option(stage.label + '全部年级', stage.prefix + '-all'));
    stage.grades.forEach((label, index) => {
      const value = stage.prefix + (index + 1);
      const full = stage.id === 'primary' ? stage.label + label : label;
      grades.set(value, full); options.append(new Option(full, value));
      const button = el('button', 'grade-button', label);
      button.type = 'button'; button.dataset.grade = value;
      button.setAttribute('aria-label', '浏览' + full + '实验'); button.setAttribute('aria-pressed', 'false');
      button.addEventListener('click', () => chooseGrade(value, true)); buttons.append(button);
    });
    group.append(buttons); $('grade-directory').append(group); $('grade-select').append(options);
  }
  const params = new URLSearchParams(location.search);
  if (grades.has(params.get('grade'))) state.grade = params.get('grade');
  state.query = (params.get('q') || '').slice(0, 80);
  $('search-input').value = state.query;
  function entryCard(experiment) {
    const article = el('article', 'experiment-card');
    const copy = el('div', 'experiment-copy');
    const tags = el('div', 'tags'); tags.append(el('span', 'tag', experiment.gradeLabel), el('span', 'tag subject', experiment.subject));
    copy.append(tags, el('h3', '', experiment.title), el('p', 'experiment-description', experiment.description), el('p', 'topics', experiment.topics.join(' · ')));
    const link = el('a', 'primary-link', '进入实验'); link.href = experiment.href;
    link.setAttribute('aria-label', '进入' + experiment.title + '实验'); link.append(arrow()); copy.append(link);
    const art = el('a', 'experiment-art'); art.href = experiment.href; art.setAttribute('aria-label', '进入' + experiment.title + '实验（图示）');
    const img = document.createElement('img'); img.src = experiment.illustration; img.alt = experiment.illustrationAlt;
    img.width = 900; img.height = 385; img.decoding = 'async'; art.append(img);
    article.append(copy, art); return article;
  }
  function render() {
    const query = state.query.trim().toLocaleLowerCase('zh-CN');
    const words = query.split(/\s+/).filter(Boolean);
    const matches = catalog.experiments.filter(experiment => {
      const gradeMatches = state.grade === 'all' || (state.grade.endsWith('-all') ? experiment.stage === stagePrefixes.get(state.grade[0]) : experiment.grades.includes(state.grade));
      const searchable = [experiment.title, experiment.description, experiment.subject, experiment.gradeLabel, ...experiment.topics, ...experiment.keywords].join(' ').toLocaleLowerCase('zh-CN');
      return gradeMatches && words.every(word => searchable.includes(word));
    });
    $('experiment-list').replaceChildren(...matches.map(entryCard));
    $('result-count').textContent = `共 ${matches.length} 个实验`;
    $('grade-select').value = state.grade;
    $('clear-filter').disabled = state.grade === 'all' && !state.query;
    $('clear-search').hidden = !state.query;
    $('empty-state').hidden = matches.length !== 0;
    $('empty-heading').textContent = query ? '还没有找到相关实验。' : '这个年级的小实验，还在准备中。';
    $('empty-description').textContent = query ? '试试“平衡”“天平”或“数量”，也可以清除筛选，查看已经开放的小实验。' : '新的实验加入后，会在这里按年级呈现。也可以先看看已经开放的绿豆天平。';
    document.querySelectorAll('[data-grade]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.grade === state.grade)));
    document.querySelectorAll('.grade-group').forEach(group => { group.dataset.active = String(state.grade !== 'all' && stagePrefixes.get(state.grade[0]) === group.dataset.stage); });
    const url = new URL(location.href);
    if (state.grade === 'all') url.searchParams.delete('grade'); else url.searchParams.set('grade', state.grade);
    if (state.query) url.searchParams.set('q', state.query); else url.searchParams.delete('q');
    try { history.replaceState(null, '', url); } catch { /* Some offline file viewers disable history updates; filtering still works. */ }
  }
  $('grade-select').addEventListener('change', event => chooseGrade(event.target.value, false));
  $('search-input').addEventListener('input', event => { state.query = event.target.value; render(); });
  document.querySelector('.search').addEventListener('submit', event => event.preventDefault());
  function reset() { state.grade = 'all'; state.query = ''; $('search-input').value = ''; render(); }
  $('clear-filter').addEventListener('click', reset); $('empty-reset').addEventListener('click', reset);
  $('clear-search').addEventListener('click', () => { state.query = ''; $('search-input').value = ''; render(); $('search-input').focus(); });
  $('teaching-help').addEventListener('click', () => $('teaching-dialog').showModal());
  ['close-dialog', 'help-done'].forEach(id => $(id).addEventListener('click', () => $('teaching-dialog').close()));
  $('teaching-dialog').addEventListener('click', event => { if (event.target !== event.currentTarget) return; const r = event.currentTarget.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.currentTarget.close(); });
  render();
})();
