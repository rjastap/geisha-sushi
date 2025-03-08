document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginForm = document.getElementById('loginForm');
    const adminPanel = document.getElementById('adminPanel');
    const authForm = document.getElementById('authForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const addItemBtn = document.getElementById('addItemBtn');
    const itemModal = document.getElementById('itemModal');
    const itemForm = document.getElementById('itemForm');
    const closeModal = document.querySelector('.close-modal');
    const menuItemsList = document.getElementById('menuItemsList');

    // Estado de la aplicación
    let currentItems = [];
    let editingItemId = null;

    // Verificar si hay una sesión activa
    checkSession();

    // Event Listeners
    authForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    addItemBtn.addEventListener('click', () => openModal());
    closeModal.addEventListener('click', () => itemModal.style.display = 'none');
    itemForm.addEventListener('submit', handleItemSubmit);

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target === itemModal) {
            itemModal.style.display = 'none';
        }
    });

    // Funciones de autenticación
    function handleLogin(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        // Aquí deberías hacer una llamada a tu API de autenticación
        // Por ahora, usaremos credenciales hardcodeadas
        if (username === 'admin' && password === 'admin123') {
            localStorage.setItem('adminSession', 'true');
            showAdminPanel();
            loadMenuItems();
        } else {
            alert('Credenciales incorrectas');
        }
    }

    function handleLogout() {
        localStorage.removeItem('adminSession');
        showLoginForm();
    }

    function checkSession() {
        if (localStorage.getItem('adminSession')) {
            showAdminPanel();
            loadMenuItems();
        } else {
            showLoginForm();
        }
    }

    function showLoginForm() {
        loginForm.style.display = 'block';
        adminPanel.style.display = 'none';
    }

    function showAdminPanel() {
        loginForm.style.display = 'none';
        adminPanel.style.display = 'block';
    }

    // Funciones de gestión del menú
    function loadMenuItems() {
        // Aquí deberías cargar los items desde tu backend
        // Por ahora, usaremos datos de ejemplo
        currentItems = [
            {
                id: 1,
                name: 'Edamame',
                price: 35000,
                description: 'Porción de judías verdes de soja hervidas',
                category: 'entradas'
            }
        ];
        renderMenuItems();
    }

    function renderMenuItems() {
        menuItemsList.innerHTML = '';
        currentItems.forEach(item => {
            const itemElement = createItemElement(item);
            menuItemsList.appendChild(itemElement);
        });
    }

    function createItemElement(item) {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">${formatPrice(item.price)} Gs</p>
            <div class="menu-item-actions">
                <button onclick="editItem(${item.id})">Editar</button>
                <button onclick="deleteItem(${item.id})">Eliminar</button>
            </div>
        `;
        return div;
    }

    function openModal(item = null) {
        editingItemId = item ? item.id : null;
        itemModal.style.display = 'block';
        
        if (item) {
            document.getElementById('itemName').value = item.name;
            document.getElementById('itemPrice').value = item.price;
            document.getElementById('itemDescription').value = item.description;
            document.getElementById('itemCategory').value = item.category;
        } else {
            itemForm.reset();
        }
    }

    function handleItemSubmit(e) {
        e.preventDefault();
        const formData = new FormData(itemForm);
        const itemData = {
            name: formData.get('name'),
            price: parseInt(formData.get('price')),
            description: formData.get('description'),
            category: formData.get('category')
        };

        if (editingItemId) {
            // Actualizar item existente
            updateItem(editingItemId, itemData);
        } else {
            // Crear nuevo item
            createItem(itemData);
        }

        itemModal.style.display = 'none';
        itemForm.reset();
    }

    // Funciones auxiliares
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Exponer funciones necesarias globalmente
    window.editItem = function(id) {
        const item = currentItems.find(item => item.id === id);
        if (item) openModal(item);
    };

    window.deleteItem = function(id) {
        if (confirm('¿Estás seguro de que deseas eliminar este item?')) {
            // Aquí deberías hacer una llamada a tu API para eliminar el item
            currentItems = currentItems.filter(item => item.id !== id);
            renderMenuItems();
        }
    };

    // Funciones de API (mock)
    function createItem(itemData) {
        // Aquí deberías hacer una llamada a tu API para crear el item
        const newItem = {
            ...itemData,
            id: Date.now() // Generador simple de ID
        };
        currentItems.push(newItem);
        renderMenuItems();
    }

    function updateItem(id, itemData) {
        // Aquí deberías hacer una llamada a tu API para actualizar el item
        currentItems = currentItems.map(item => 
            item.id === id ? { ...item, ...itemData } : item
        );
        renderMenuItems();
    }
}); 