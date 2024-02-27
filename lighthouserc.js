module.exports = {
  ci: {
    collect: {
      startServerCommand: 'npm run dev',
      url: ['http://localhost:80'],
      numberOfRuns: 3
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};