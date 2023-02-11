class Dropdown {
  // Свойства объекта, заданные по умолчанию
  defaultOptions = {
    isColorItem: true,
    multilist: true,
  };

  constructor(selector, options) {
    this.options = Object.assign(this.defaultOptions, options);
    // Главный элемент, в котором ищутся все остальные
    this.dropdown = document.querySelector(selector);

    // Если нет элемента на странице, дальше код не выполняется
    if (!this.dropdown) return;

    this.multilist = this.options.multilist;
    this.counterActiveItem = 0;

    this.back = this.dropdown.querySelector('.dropdown__back');
    this.btn = this.dropdown.querySelector('.dropdown__btn');
    this.menu = this.dropdown.querySelector('.dropdown__menu');
    this.menuItem = this.dropdown.querySelectorAll('.dropdown__item');
    this.checkbox = this.dropdown.querySelectorAll('.dropdown__checkbox');

    // Точка входа
    this.init();
  }

  // Запускает приложение
  init() {
    this.toggleBtn();
    this.multilist ? this.activeMenuItemMulti() : this.activeMenuItem();
    // if (!this.multilist) this.removeCheckbox();
    this.closeClickBack();
  }

  // Проверяет открыто ли меню
  isMenuShow() {
    return this.menu.classList.contains('show') ? true : false;
  }

  // Открывает меню
  openMenu() {
    this.menu.classList.add('show');
    this.btn.classList.add('show');
    this.back.classList.add('show');
  }
  // Закрывает меню
  closeMenu() {
    this.menu.classList.remove('show');
    this.btn.classList.remove('show');
    this.back.classList.remove('show');
  }

  // Клик по кнопке, откр. или закр. меню
  toggleBtn() {
    this.btn.addEventListener('click', () => {
      if (!this.isMenuShow()) {
        this.openMenu();
      } else {
        this.closeMenu();
      }
    });
  }

  // Закрывает меню по клику за пределами меню
  closeClickBack() {
    window.addEventListener('click', e => {
      if (e.target.classList.contains('dropdown__back')) {
        this.closeMenu();
      }
    });
  }

  // Делает активным пункт меню
  activeMenuItem() {
    this.menuItem.forEach(item => {
      item.addEventListener('click', () => {
        this.btn.textContent = item.textContent;
        if (this.options.isColorItem) {
          this.menuItem.forEach(elem => {
            elem.classList.remove('active');
          });
          item.classList.add('active');

          // Один активный чекбокс
          this.checkbox.forEach(check => {
            check.checked = false;
          });
          item.querySelector('.dropdown__checkbox').checked = true;
        }
        this.closeMenu();
      });
    });
  }

  // Делает активным пункты меню при выборе мультименю
  activeMenuItemMulti() {
    // let arrTextItem=[]
    this.menuItem.forEach(item => {
      item.addEventListener('click', () => {
        // this.btn.textContent = item.textContent;
        if (this.options.isColorItem) {
          if (item.querySelector('.dropdown__checkbox').checked) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        }

        // this.closeMenu();
        console.log(item.querySelector('.dropdown__checkbox').checked);
      });
    });
  }

  // Удаляет чекбоксы
  // removeCheckbox() {
  //   this.checkbox.forEach(item => {
  //     item.remove();
  //   });
  // }

  // Один активный чекбокс
  oneCheckbox() {}
}

// ==========================================================
const dd = new Dropdown('.dropdown', {
  isColorItem: true,
  multilist: true,
});
