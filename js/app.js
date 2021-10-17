// Vue.use(Vuetify);
const app = new Vue({
    el: "#app",
    data: function () {
        return {
            newItem: {
                itemId: '0',
                name: '',
                description: '',
                qty: 1,
                category: ''
            },


            inventory: [
                new Phone('IPhone 10', 15, '', '10th Apple Phone Design', 'IOS'),
                new Phone('Samsung Galaxy S10', 10, '', '10th Android Phone Design', 'Android'),
                new Computer('Macbook Air', 17, '', 'Lightweight and Portable', '600GB', '8GB', 'Apple M1 8 Core'),
                new Computer('ASUS Laptop', 5, '', 'High Powered Gaming Laptop', '800GB','16GB', 'Intel i7'),
                new Console('Playstation 4', 11, '', 'Sony\'s 4th Installment of Playstation consoles', '500GB', '120'),

            ],
            backupInventory: [
                new Phone('IPhone 10', 15, '', '10th Apple Phone Design', 'IOS'),
                new Phone('Samsung Galaxy S10', 10, '', '10th Android Phone Design', 'Android'),
                new Computer('Macbook Air', 17, '', 'Lightweight and Portable', '600GB', '8GB', 'Apple M1 8 Core'),
                new Computer('ASUS Laptop', 5, '', 'High Powered Gaming Laptop', '800GB','16GB', 'Intel i7'),
                new Console('Playstation 4', 11, '', 'Sony\'s 4th Installment of Playstation consoles', '500GB', '120'),
            ],

        }
    },
    methods: {

    },
    computed: {


    },
    // mounted: function() {
    //     if(localStorage.getItem('inventory')){
    //         this.inventory = JSON.parse(localStorage.getItem('inventory'));
    //     }
    // },
    // watch: {
    //     inventory: {
    //         handler: function(newList){
    //             localStorage.setItem('inventory', JSON.stringify(newList));
    //         },
    //         deep: true,
    //     }
    // }
});
