
AOS.init();


addEventListener('activate', event => {
    event.waitUntil(async function() {
      // Feature-detect
      if (self.registration.navigationPreload) {
        // Enable navigation preloads!
        await self.registration.navigationPreload.enable();
      }
    }());
  });

  function callout(){
    let cl = document.getElementById("callout");
    cl.style.display = "block";
  };
  function hidecallout(){
    let cl = document.getElementById("callout");
    cl.style.display = "none";
  };





  //аналог element.closest
	var closestsElementClass = function (elem, className) {
		var node = elem;
		/*/	если клик по дочернему элементу, то возвращаем
		*	класс родителя, перескакивая вверх через ноду по циклу
		/*/
		while (node) {
			/*/ если текущий элемент содержит тот класс, который мы ему передали,
			*	при вызове функции, то просто возвращаем этот элемент, 
			/*/
			if (node.classList.contains(className)) {
				return node; //класс есть — значит его и возвращаем, прекращая функцию
			}
			/*/ если класса нет, то вместо текущего елемента берется его родительский
			*	и так по циклу до тех пор, пока у конечного родителя не найдется класс, 
			*   который мы передали, иначе return null
			/*/
			node = node.parentElement;
		}
		//возврат null если нет нашего класса ни у элемента, ни у его дочерних узлов
		return null;
	}

	//контейнер с товарами
	var catalog = document.querySelector('.portfolio-container');
	//блок с табами
	var catalogNav = document.querySelector('.filter__tabs');
	//товары
	var catalogItems = document.querySelectorAll('.portfolio__item');



	//Очистка блока с элементами, чтобы при фильрации добавлялись новые в чиситый блок
	function removeChildren(item) {
		while (item.firstChild) {
			item.removeChild(item.firstChild)
		}
	}

	//обновляем элементы в каталоге | item это блок каталога
	function updateChildren(item, children) {
		removeChildren(item);
		for (var i = 0; i < children.length; i++) {
			item.appendChild(children[i]);
		}
	}

	catalogNav.addEventListener('click', function (e) {
		var target = e.target;
		var item = closestsElementClass(target, 'filter__btn');
		if (item === null || item.classList.contains('is-active')) {
			return;
		}

		e.preventDefault();

		var filterValue = item.getAttribute('data-filter');
		var previousActiveBtn = document.querySelector('.filter__btn.is-active');
		previousActiveBtn.classList.remove('is-active');
		item.classList.add('is-active');

		if (filterValue === 'all') {
			updateChildren(catalog, catalogItems);
			return;
		}


		var filteredItems = [];
		for (var i = 0; i < catalogItems.length; i++) {
			var currentItem = catalogItems[i];
			if (currentItem.getAttribute('data-category') === filterValue) {
				filteredItems.push(currentItem);
			}
		}
		updateChildren(catalog, filteredItems);
	});