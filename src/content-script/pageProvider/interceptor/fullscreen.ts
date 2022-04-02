import IconWarning from 'ui/assets/warning.svg';

const isFullScreen = () => {
  return (
    document.fullscreenElement ||
    window.screen.availHeight === window.screen.height
  );
};
export const fullscreenCheck = (data: any) => {
  if (!data || data.method !== 'eth_sendTransaction' || !isFullScreen()) {
    return;
  }
  setTimeout(() => {
    Dialog.open();
  });
  throw {
    code: 4001,
    message:
      'Temporarily does not support fullscreen initiation of transactions',
  };
};

class Dialog {
  styles = `
    .rabby-dialog {
      position: fixed;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0; 
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999;
    }
    .rabby-dialog-overlay {
      display: none;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,.15);
    }
    .rabby-dialog-content {
      position: absolute;
      right: 0;
      top: 0; 
      background: #fff;
      border-radius: 6px;
      width: 400px;
      z-index: 1;
      box-shadow: 0px 16px 20px rgb(45 48 51 / 16%);
    }
    .rabby-dialog-body {
      padding: 60px 16px;
      border-bottom: 1px solid #E5E9EF;
      text-align: center;
    }
    .rabby-dialog-icon {
      width: 68px;
      height: 68px;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 28px;
    }
    .rabby-dialog-msg {
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 26px;
      text-align: center;
      color: #13141A;
    }
    .rabby-dialog-footer {
      padding: 24px;
      text-align: center;
    }
    .rabby-btn {
      background: #8697FF;
      border-radius: 6px;
      width: 200px;
      height: 44px
      text-align: center;
      padding: 13px;
      border: none;
      outline: none;
      cursor: pointer;

      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 500;
      font-size: 15px;
      line-height: 18px;
      text-align: center;
      color: #fff;
    }
    .rabby-btn:hover,
    .rabby-bnt:focus {
      box-shadow: 0px 8px 16px rgba(134, 151, 255, 0.3);
    }
  `;

  template = () => {
    return `
      <div class="rabby-dialog">
        <div class="rabby-dialog-overlay" data-close></div>
        <div class="rabby-dialog-content">
          <div class="rabby-dialog-body">
            <img class="rabby-dialog-icon" src="${IconWarning}">
            <div class="rabby-dialog-msg">Temporarily does not support fullscreen initiation of transactions</div>
          </div>
          <div class="rabby-dialog-footer">
            <button class="rabby-btn" type="button" data-close>OK</button>
          </div>
        </div>
      </div>
    `;
  };

  static instance?: Dialog | null;

  static open = () => {
    if (Dialog.instance) {
      return;
    }
    const dialog = new Dialog();
    Dialog.instance = dialog;
    const style = document.createElement('style');
    style.setAttribute('rel', 'stylesheet');
    style.innerHTML = dialog.styles;
    document.head.appendChild(style);

    const div = document.createElement('div');
    div.innerHTML = dialog.template();

    document.body.appendChild(div);
    const close = () => {
      document.head.removeChild(style);
      document.body.removeChild(div);
      Dialog.instance = null;
    };

    Array.from(div.querySelectorAll('[data-close]')).forEach((el) =>
      el.addEventListener('click', () => {
        close();
      })
    );

    return {
      close,
    };
  };
}
