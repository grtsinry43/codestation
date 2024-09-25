import pangu from 'pangu';

export const applyPanguToTextContent = () => {
    console.log("全局 Pangu 格式化🎉");
    const walk = (node) => {
        if (node.nodeType === Node.TEXT_NODE) {
            if (node.nodeValue.trim()) {
                node.nodeValue = pangu.spacing(node.nodeValue);
            }
        } else {
            node.childNodes.forEach(walk);
        }
    };

    const observer = new MutationObserver(() => {
        document.body.childNodes.forEach(walk);
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

    // 初始调用
    document.body.childNodes.forEach(walk);
};

