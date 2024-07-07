document.getElementById('uploadButton').addEventListener('click', uploadImage);

async function uploadImage() {
    const imageInput = document.getElementById('imageInput');
    const file = imageInput.files[0];
    const progressBar = document.getElementById('progressBar');
    const progressContainer = document.getElementById('progressContainer');
    const originalImage = document.getElementById('originalImage');
    const processedImage = document.getElementById('processedImage');
    const labelsDiv = document.getElementById('labels');
    const apiEndpointInput = document.getElementById('apiEndpoint');
    const contents = document.querySelector('.contents');

    if (!file) {
        alert('请选择一个文件！');
        return;
    }

    const apiEndpoint = apiEndpointInput.value;
    if (!apiEndpoint) {
        alert('请输入API接口！');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // 显示原始图像
    originalImage.src = URL.createObjectURL(file);

    try {
        progressBar.style.width = '0%';
        contents.textContent = '任务执行中';
        progressContainer.style.display = 'block';

        const response = await fetch(apiEndpoint, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error(`服务器错误: ${response.statusText}`);
        }

        // 模拟进度条进度
        progressBar.style.width = '50%';

        const data = await response.json();
        console.log('响应数据:', data);

        progressBar.style.width = '100%';

        const imageUrl = data.image_url;
        const labels = data.labels;

        processedImage.src = imageUrl;
        labelsDiv.innerHTML = `标签: ${labels.join(', ')}`;
        contents.textContent = '任务已执行完成';

    } catch (error) {
        console.error('错误:', error);
        alert('上传图片时发生错误。');
        contents.textContent = '任务执行失败';
    }
}
