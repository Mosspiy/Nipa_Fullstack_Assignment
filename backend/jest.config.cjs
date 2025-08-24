/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  // โฟลเดอร์เทสต์ของมึงตอนนี้คือ "test" (ไม่ใช่ "tests")
  roots: ['<rootDir>/test'],
  moduleFileExtensions: ['js', 'json'],
  clearMocks: true,
  verbose: true,
  // ไม่ใช้ babel/transform ใด ๆ เพื่อให้เบาและเร็ว
};
