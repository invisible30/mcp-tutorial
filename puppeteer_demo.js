// 使用Puppeteer进行网页自动化示例

async function runPuppeteerDemo() {
    try {
        console.log('开始Puppeteer自动化演示...');

        // 使用MCP工具进行网页导航
        console.log('正在导航到百度...');
        await mcp.run('puppeteer_navigate', { url: 'https://www.baidu.com' });

        // 等待页面加载完成
        console.log('页面加载完成，准备截图...');

        // 截取整个页面的截图
        await mcp.run('puppeteer_screenshot', { name: 'baidu-homepage', width: 1280, height: 800 });
        console.log('已保存百度首页截图');

        // 在搜索框中输入文字
        console.log('在搜索框中输入文字...');
        await mcp.run('puppeteer_fill', { selector: '#kw', value: '人工智能' });

        // 点击搜索按钮
        console.log('点击搜索按钮...');
        await mcp.run('puppeteer_click', { selector: '#su' });

        // 等待搜索结果加载
        console.log('等待搜索结果加载...');
        // 这里可以使用evaluate执行脚本等待搜索结果
        await mcp.run('puppeteer_evaluate', {
            script: 'return new Promise(resolve => setTimeout(resolve, 2000))'
        });

        // 截取搜索结果页面的截图
        console.log('截取搜索结果页面...');
        await mcp.run('puppeteer_screenshot', { name: 'baidu-search-result', width: 1280, height: 800 });
        console.log('已保存搜索结果截图');

        // 执行更多操作，如提取搜索结果
        console.log('提取搜索结果标题...');
        const titles = await mcp.run('puppeteer_evaluate', {
            script: `
        return Array.from(document.querySelectorAll('.result h3')).map(el => el.textContent);
      `
        });

        console.log('搜索结果标题:');
        console.log(titles);

        console.log('Puppeteer自动化演示完成!');
    } catch (error) {
        console.error('Puppeteer自动化演示出错:', error);
    }
}