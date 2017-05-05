(function() {
    document.addEventListener('DOMContentLoaded', function () {
        var divs = document.querySelectorAll('.dnd-file-input');
        Array.prototype.forEach.call(divs, function (div) {
            new DndFileInput(div);
        });
    });

    window.DndFileInput = function (div) {
        var file = div.querySelector('input[type="file"]');

        var preview = document.createElement('div');
        preview.className = 'dnd-file-input-preview';
        div.insertBefore(preview, file);

        var icon = document.createElement('div');
        icon.className = 'dnd-file-input-icon';
        div.insertBefore(icon, file);

        file.addEventListener('change', handleUpload);

        var deleteButton = document.createElement('a');
        deleteButton.href = 'javascript:;';
        deleteButton.className = 'dnd-file-input-delete';
        deleteButton.addEventListener('click', deleteUpload);
        div.appendChild(deleteButton);

        var deleteHidden;

        if (div.dataset.current) {
            setPreview(div.dataset.current);
            showDelete(true);
        } else {
            showDelete(false);
        }

        function handleUpload() {
            var upload, reader;

            if (file.files && file.files.length > 0) {
                showDelete(true);
                upload = file.files[0];
                reader = new FileReader();
                reader.onload = function (event) {
                    setPreview(event.target.result);
                };
                reader.readAsDataURL(upload);
            } else {
                showDelete(false);
                setPreview(null);
            }
        }

        function deleteUpload() {
            if (!deleteHidden) {
                deleteHidden = document.createElement('input');
                deleteHidden.type = 'hidden';
                deleteHidden.name = 'delete-' + file.name;
                deleteHidden.value = '1';
                div.appendChild(deleteHidden);
            }

            file.value = '';

            setPreview(null);
            showDelete(false);
        }

        function setPreview(image) {
            preview.style.backgroundImage = image ? 'url(' + image + ')' : 'none';
        }

        function showDelete(visible) {
            deleteButton.style.display = visible ? 'inline' : 'none';
        }
    };

    window.DndFileInput.loadStyles = function () {
        var i, script, match;
        var scripts = document.getElementsByTagName('script');
        for (i = scripts.length - 1; i >= 0; i--) {
            script = scripts[i];
            if (script.src && (match = /((([^?])*\/)?)dnd-file-input\.js($|\?|#)/.exec(script.src))) {
                addStylesheet(match[1] + 'dnd-file-input.css');
            }
        }
    };

    function addStylesheet(url) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = url;
        if(document.head.firstChild) {
            document.head.insertBefore(link, document.head.firstChild)
        } else {
            document.head.appendChild(link);
        }
    };
})();