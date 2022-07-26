// Variables
let nombre;
let precio;
let cantidad;
let continuar = false;

// Clases
class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }

    calcularPrecioConIva() {
        return this.precio * 1.21 * this.cantidad;
    }
}

class Carrito {
    constructor() {
        this.productos = [];
        this.total = 0;
    }

    // Verificar si el producto esta repetido o no, en caso afirmativo aumentar la cantidad
    verificarProducto(nombre, precio, cantidad) {
        
        if(this.buscarProducto(nombre)) {
            // Indice del producto repetido
            let indexProduct = this.buscarIndiceProducto(nombre);
            // Aumentar la cantidad
            const cantidadActualizada = this.productos[indexProduct].cantidad + cantidad;
            // Eliminarlo del array
            this.productos.splice(indexProduct, 1);

            // Agregarlo al array con la cantidad modificada
            this.agregarProducto(nombre, precio, cantidadActualizada);
            return;
        } 
        
        // En caso que no esté repetido va a agregarlo al array normalmente
        this.agregarProducto(nombre, precio, cantidad);
    }

    // Crea el objeto Producto y lo agrega en el array
    agregarProducto(nombre, precio, cantidad) {
        const producto = new Producto(nombre, precio, cantidad);
        this.productos.push(producto);
    }

    // Buscar si existe un producto con el mismo nombre
    buscarProducto(nombre) {
        return this.productos.some( (producto) => producto.nombre === nombre);
    }

    // Buscar el índice en el array del producto repetido
    buscarIndiceProducto(nombre) {
        return this.productos.findIndex( (producto) => producto.nombre === nombre);
    }

    // Calcular precio total con iva
    calcularPrecioTotalConIva() {
        let total = 0;

        for(const producto of this.productos) {
            total += producto.calcularPrecioConIva();
        }
        
        // Actualizamos el valor del atributo
        this.total = total;
        return total;
    }

    mostrarProductos() {
        let nombresProductos = '';

        for(const producto of this.productos) {
            nombresProductos += ('-Nombre: ' + producto.nombre + ' -Precio: ' + producto.precio + ' -Cantidad: ' + producto.cantidad + '\n'); 
        }
        return nombresProductos;
    }
}

// Instanciando el objeto carrito
const carrito = new Carrito();

// Ciclo para pedir nombre, precio y cantidad del producto, y si desea continuar cargando productos en el carrito
do {
    nombre = prompt('Ingrese el nombre del producto: ');
    precio = parseFloat(prompt('Ingrese el precio del producto: '));
    cantidad = parseInt(prompt('Ingrese la cantidad del producto: '));

    continuar = prompt('Quiere continuar ingresando valores? (y/N)') === 'y';
      
    if (precio && cantidad) {
            carrito.verificarProducto(nombre, precio, cantidad);
    }

} while (continuar);

alert('Los productos en el carrito son: \n' + carrito.mostrarProductos());
alert('El total a pagar es: ' + carrito.calcularPrecioTotalConIva());