(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (factory());
}(this, (function () {
    'use strict';

    function lodash_get(path) {
        let result = window;
        const paths = path.split(".");
        for (const p of paths) {
            result = Object(result)[p];
            if (result == undefined) {
                return result;
            }
        }
        return result;
    }

    function styleInject(css, ref) {
        if (ref === void 0) ref = {};
        var insertAt = ref.insertAt;

        if (!css || typeof document === 'undefined') { return; }

        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');
        style.type = 'text/css';

        if (insertAt === 'top') {
            if (head.firstChild) {
                head.insertBefore(style, head.firstChild);
            } else {
                head.appendChild(style);
            }
        } else {
            head.appendChild(style);
        }

        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }
    }

    var css = ".sidebar-nav li { position: relative; margin: 0; cursor: pointer } .folder::before { content: ''; display: block; position: absolute; top: 11px; left: -12px; height: 6px; width: 6px; border-right: 1px solid #505d6b; border-bottom: 1px solid #505d6b; transform: rotate(-45deg); transition: transform .1s } .sidebar-nav>ul>li ul { display: none; } .open::before { transform: rotate(45deg) } .collapse::before { transform: rotate(-45deg) }";
    styleInject(css);

    var clickFolderClassCache = [];
    var sidebarTreeOpen = false;
    function docsifySidebarTreeCode(hook, vm) { 

        sidebarTreeOpen = lodash_get("window.$docsify.sidebarTree.open") ? true : false;

        hook.doneEach(function () {
            addFolderFileClass();
            openDefaultActiveNode();
            openCacheFolder();
            console.log('docsify-sidebar-tree hook.doneEach');
        });

        hook.ready(function () {
            console.log('docsify-sidebar-tree hook.ready');
        });

        hook.mounted(function () {
            console.log('docsify-sidebar-tree hook.mounted');
        });
    }

    // add folder and file class
    function addFolderFileClass() {
        var folderIndex = 0;
        document.querySelectorAll('.sidebar-nav li').forEach(function (li, index) {
            var ul = li.querySelector('ul');
            if (ul) {
                li.classList.add('folder', 'folder-index-'.concat(folderIndex));
                if (sidebarTreeOpen) {
                    li.classList.add('open');
                    ul.style.display = 'block';
                }
                li.addEventListener('click', folderClick);
                folderIndex++;
            } else {
                li.classList.add('file');
            }
        });
    }

    function openDefaultActiveNode() {
        var node = document.querySelector('.sidebar-nav .active');
        while (node && node.className !== 'sidebar-nav') {
            if (node.parentNode.tagName === 'UL') {
                node.classList.add('open');
                node.parentNode.style.display = 'block';
            }
            node.classList.forEach(cls => {
                if (cls.indexOf('folder-index-') != -1) {
                    var isSaveToCache = false;
                    if ((sidebarTreeOpen && node.classList.contains('collapse')) || (sidebarTreeOpen == false && node.classList.contains('open'))) {
                        isSaveToCache = true;
                    }
                    if (isSaveToCache) {
                        if (!clickFolderClassCache.includes(cls)) {
                            clickFolderClassCache.push(cls);
                        }
                    } else {
                        clickFolderClassCache.pop(cls);
                    }
                }
            });
            node = node.parentNode;
        }
    }

    function openCacheFolder() {
        console.log(clickFolderClassCache);
        //cache set folder
        clickFolderClassCache.forEach(function (cls) {
            var _cls = '.'.concat(cls);
            if (sidebarTreeOpen) {
                document.querySelector(_cls).classList.add('collapse');
                document.querySelector(_cls).querySelector("ul").style.display = 'none';
            } else {
                document.querySelector(_cls).classList.add('open');
                document.querySelector(_cls).querySelector("ul").style.display = 'block';
            }
        });
    }

    function folderClick(e) {
        var target = e.target;
        if (target.tagName === 'A') {
            target = target.parentNode;
        }
        if (target.classList.contains("folder")) {
            target.childNodes.forEach(function (ul) {
                if (ul.tagName === 'UL') {
                    if (ul.style.display === '' || ul.style.display === 'none') {
                        ul.style.display = 'block';
                        ul.parentNode.classList.remove('collapse');
                        ul.parentNode.classList.add('open');
                    } else {
                        ul.style.display = 'none';
                        ul.parentNode.classList.remove('open');
                        ul.parentNode.classList.add('collapse');
                    }
                }
            });
            var isOpen = target.classList.contains('open');

            //add cache
            target.classList.forEach(cls => {
                if (cls.indexOf('folder-index-') != -1) {
                    if (isOpen) {
                        if (!clickFolderClassCache.includes(cls)) {
                            clickFolderClassCache.push(cls);
                        }
                    } else {
                        clickFolderClassCache.pop(cls);
                    }
                }
            });

            event.stopPropagation();
        }
        console.log("folderClick = " + clickFolderClassCache);
    }

    function findTagParent(curNode, tagName, level) {
        if (curNode && curNode.tagName === tagName) return curNode;
        var l = 0;
        while (curNode) {
            l++;
            if (l > level) return;
            if (curNode.parentNode.tagName === tagName) {
                return curNode.parentNode;
            }
            curNode = curNode.parentNode;
        }
    }

    window.$docsify = window.$docsify || {};
    window.$docsify.plugins = [docsifySidebarTreeCode].concat(window.$docsify.plugins || []);
})));
