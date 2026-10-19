/* Add real, working experiments here. Grade values are recommendations, not textbook requirements. */
window.CLASSROOM_CATALOG = {
  stages: [
    { id: 'primary', label: '小学', prefix: 'p', grades: ['一年级', '二年级', '三年级', '四年级', '五年级', '六年级'] },
    { id: 'middle', label: '初中', prefix: 'm', grades: ['初一', '初二', '初三'] },
    { id: 'high', label: '高中', prefix: 'h', grades: ['高一', '高二', '高三'] }
  ],
  experiments: [
    {
      id: 'bean-balance',
      title: '绿豆天平',
      stage: 'primary',
      grades: ['p1', 'p2'],
      gradeLabel: '小学一年级 · 二年级',
      subject: '数学与科学',
      description: '放入绿豆、观察倾斜，让抽象的轻重与平衡变得看得见。',
      topics: ['轻重比较', '等量关系', '观察与预测'],
      keywords: ['天平', '绿豆', '平衡', '气泡', '重量', '比较', '相等', '数量', '加减', '数学', '科学'],
      href: 'experiments/bean-balance/index.html',
      illustration: 'assets/bean-balance.svg',
      illustrationAlt: '两边各放五颗绿豆的天平保持平衡，绿色气泡管中的白色气泡居中。'
    }
  ]
};
