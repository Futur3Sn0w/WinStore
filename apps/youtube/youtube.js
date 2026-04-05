(function () {
    const webview = document.getElementById('youtube-view');
    const loading = document.getElementById('youtube-loading');
    const status = document.getElementById('youtube-loading-status');

    if (!webview || !loading) return;

    function setStatus(msg) {
        if (status) status.textContent = msg;
    }

    function hideLoading() {
        loading.classList.add('hidden');
    }

    webview.addEventListener('did-start-loading', () => setStatus('Loading YouTube...'));
    webview.addEventListener('did-finish-load', () => hideLoading());
    webview.addEventListener('dom-ready', () => hideLoading());
    webview.addEventListener('page-title-updated', e => { if (e.title) setStatus(e.title); });
    webview.addEventListener('did-fail-load', e => {
        if (e.errorCode === -3) return;
        loading.classList.remove('hidden');
        setStatus(`Error ${e.errorCode}: ${e.errorDescription}`);
    });
})();
