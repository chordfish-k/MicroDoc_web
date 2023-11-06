/**
 * vite 解决 require("文件地址") 引入静态文件报错问题
 * 
 * @param staticPath 静态文件地址
 * @returns 
 */
export function require(staticPath: string): string {
  return new URL(`${staticPath}`, import.meta.url).href
}
