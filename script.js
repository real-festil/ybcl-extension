let styleElement = null;
const styles = `
        #columns.ytd-watch-grid {
          flex-direction: column !important;
        }

        #contents.ytd-rich-grid-renderer {
          flex-wrap: nowrap !important;
          overflow-x: auto !important;
          max-width: 1500px !important;
          width: calc(100vw - 40px) !important;
        }

        #secondary.ytd-watch-grid {
          width: calc(100% - 40px) !important;
          max-width: 1500px !important;
          margin: auto !important;
        }

        ytd-rich-item-renderer {
          width: 500px !important;
          margin-bottom: 16px;
        }

        #fixed-secondary.ytd-watch-grid {
          z-index: 3000 !important;
        }

        #fixed-secondary {
          width: calc(100% - 29px) !important;
          left: 10px !important;
        }

        .ytp-chrome-bottom {
          width: calc(100% - 12px) !important;
          left: 6px !important;
        }

        #player {
          overflow: hidden !important;
        }

        #primary {
          margin: auto !important;
        }

        #player.ytd-watch-grid {
          position: static !important;
          max-width: fit-content !important;
          margin: auto !important;
          overflow: hidden !important;
        }

        #cinematics > div > div {
          transform: none !important;
        }

        #chips-content.ytd-feed-filter-chip-bar-renderer {
          justify-content: center !important;
        }

        #player-container-outer.ytd-watch-grid {
          width: calc(100vw - 461px) !important;
          max-width: 1500px !important;
        }

        @media (min-width: 2000px) {
          #player-container-outer.ytd-watch-grid {
            width: calc(100vw - 500px) !important;
          }
        }
`;

function addStyles() {
  const existingStyleElement = document.getElementById('ybcl-styles');
  if (existingStyleElement) {
    return;
  }

  styleElement = document.createElement('style');
  styleElement.id = 'ybcl-styles';
  styleElement.innerHTML = styles;

  document.head.appendChild(styleElement);
}

function removeStyles() {
  const existingStyleElement = document.getElementById('ybcl-styles');
  if (existingStyleElement) {
    console.log('removing styles')
    document.head.removeChild(existingStyleElement);
  }
}

function onMutation(mutationsList, observer) {
  if (window.location.href.includes("watch")) {
    addStyles();
    observer.disconnect();
  } else {
    removeStyles();
  }
}

function onUrlChange() {
  if (window.location.href.includes("watch")) {
    addStyles();
  } else {
    removeStyles();
  }
}

const observer = new MutationObserver(onMutation);

observer.observe(document.documentElement, { subtree: true, childList: true });

window.addEventListener('yt-page-data-updated', onUrlChange);
