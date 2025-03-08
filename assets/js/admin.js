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
            },
            {
                id: 2,
                name: 'Misoshiru',
                price: 25000,
                description: 'Sopa tradicional japonesa con fume de pescado, wakame, tofu y cebolita de verdeo',
                category: 'entradas'
            },
            {
                id: 3,
                name: 'Seafood Miso Soup',
                price: 65000,
                description: 'Sopa de salmón, atún y camarón, con repollo japonés, wakame y cebollita de verdeo',
                category: 'entradas'
            },
            {
                id: 4,
                name: 'Salmon delights',
                price: 50000,
                description: 'Bocaditos de salmón acompañadas con salsa Tare (8)',
                category: 'entradas'
            },
            {
                id: 5,
                name: 'Camarón Harumaki',
                price: 65000,
                description: 'Arrolladito primavera relleno de camarón y queso crema (3)',
                category: 'entradas'
            },
            {
                id: 6,
                name: 'Salmon Harumaki',
                price: 60000,
                description: 'Arrolladito primavera relleno de salmón grille y queso crema (3)',
                category: 'entradas'
            },
            {
                id: 7,
                name: 'Gyoza de Verduras',
                price: 45000,
                description: 'Empanaditas japonesas de verduras acompañadas con salsa gyoza (6)',
                category: 'entradas'
            },
            {
                id: 8,
                name: 'Gyoza de Cerdo',
                price: 55000,
                description: 'Empanaditas japonesas de carne porcina acompañadas con salsa gyoza (6)',
                category: 'entradas'
            },
            {
                id: 9,
                name: 'Gyoza de Camarón',
                price: 65000,
                description: 'Empanaditas japonesas de camarón acompañadas con salsa gyoza (6)',
                category: 'entradas'
            },
            {
                id: 10,
                name: 'Camarón Tempura Fashion',
                price: 135000,
                description: 'Tempura de camarón envuelto en láminas de salmón y queso crema (8)',
                category: 'entradas'
            },
            // Ensaladas
            {
                id: 11,
                name: 'Ensalada Green',
                price: 90000,
                description: 'Hongos Shiitak, mango, aguacate, cebolla marinada, lechuga morada, zanahoria, pepino con aderezo de Honey Mustard',
                category: 'ensaladas'
            },
            {
                id: 12,
                name: 'Ensalada de Salmon y Atún',
                price: 110000,
                description: 'Mango, pepino con aderezo de mayonesa wasabi',
                category: 'ensaladas'
            },
            // Tiraditos
            {
                id: 13,
                name: 'Tiradito de Salmon',
                price: 140000,
                description: 'Cortes de salmón (300gr) en láminas finas con salsa de mango o maracuyá',
                category: 'tiraditos'
            },
            {
                id: 14,
                name: 'Tiradito de Atún',
                price: 140000,
                description: 'Cortes de atún (300gr) en láminas finas',
                category: 'tiraditos'
            },
            // Ceviches
            {
                id: 15,
                name: 'Ceviche Sensation',
                price: 150000,
                description: 'Cubos de salmón (400gr) en leche de tigre oriental',
                category: 'ceviches'
            },
            {
                id: 16,
                name: 'Ceviche Maguro',
                price: 150000,
                description: 'Cubos de atún (400gr) con leche de tigre oriental',
                category: 'ceviches'
            },
            // Platos Principales
            {
                id: 17,
                name: 'Salmon Teppaniaki',
                price: 130000,
                description: 'Salmon grillado (300gr) en jengibre y ajo con salsa Teriyaki, acompañado de hongos Shiitake & verduras salteados en manteca con arroz blanco',
                category: 'principal'
            },
            {
                id: 18,
                name: 'Arroz Frito con Salmon',
                price: 85000,
                description: 'Cebolla blanca y roja, cebollita de verdeo, repollo y zanahoria salteados en manteca con jengibre, ajo y aceite de sésamo',
                category: 'principal'
            },
            // Sushi
            {
                id: 19,
                name: 'Nigiri de Atún',
                price: 30000,
                description: 'Láminas de atún crudo servidas sobre pequeños bloques ovalados de arroz (2 piezas)',
                category: 'sushi'
            },
            {
                id: 20,
                name: 'Nigiri de Salmón',
                price: 30000,
                description: 'Láminas de salmón crudo servidas sobre pequeños bloques ovalados de arroz (2 piezas)',
                category: 'sushi'
            },
            // Postres
            {
                id: 21,
                name: 'Brownie',
                price: 35000,
                description: 'Acompañado con una bocha de helado de crema',
                category: 'postres'
            },
            // Bebidas
            {
                id: 22,
                name: 'Agua sin Gas',
                price: 8000,
                description: '',
                category: 'bebidas'
            },
            {
                id: 23,
                name: 'Corona 710cc',
                price: 30000,
                description: '',
                category: 'bebidas'
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
            <span class="category">${formatCategory(item.category)}</span>
            <p class="description">${item.description || 'Sin descripción'}</p>
            <p class="price">${formatPrice(item.price)} Gs</p>
            <div class="menu-item-actions">
                <button onclick="editItem(${item.id})">Editar</button>
                <button onclick="deleteItem(${item.id})">Eliminar</button>
            </div>
        `;
        return div;
    }

    function formatCategory(category) {
        const categories = {
            'entradas': 'Entradas',
            'ensaladas': 'Ensaladas',
            'tiraditos': 'Tiraditos',
            'ceviches': 'Ceviches',
            'tartare': 'Tartare',
            'principal': 'Principal',
            'sushi': 'Sushi',
            'temaki': 'Temaki',
            'postres': 'Postres',
            'bebidas': 'Bebidas'
        };
        return categories[category] || category;
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