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
                {itemId: '1', name: 'IPhone', qty: 1, description: ' Mobile Apple Product', category: 'Device'},
                {itemId: '2',name: 'Doritos', qty: 10, description: 'Nacho Cheese', category: 'Snacks'},
                {itemId: '3',name: 'Laptop', qty: 1, description: 'Windows', category: 'Device'},
                {itemId: '4',name: 'Macbook', qty: 2, description: 'MacOS', category: 'Device'},
                {itemId: '5',name: 'gift card', qty: 6, description: '$25', category: 'Currency'},
                {itemId: '6',name: 'cheetos', qty: 16, description: 'white cheddar', category: 'Snacks'},
                {itemId: '7',name: 'Roma Pizza', qty: 15, description: 'Cheese and Sausage', category: 'Meal'},
                {itemId: '8',name: 'Hair Clip', qty: 2, description: '4-pack', category: 'Cosmetics'},
                {itemId: '9',name: 'Green Sewing Thread', qty: 4, description: 'thin', category: 'Material'},

            ],
            searchinventory: [],


        }
    },
    methods: {

        search() {
            $('.searchTableHeader').text('Search Results for: \"' + $('#searchBox').val() + "\"")
            app.searchinventory = [];
            //checking for which option is selected
            if ($('#searchBy option:selected').text().toLowerCase() === 'name') {
                this.inventory.forEach(function (item) {

                    if (item.name.toLowerCase().includes($('#searchBox').val().toLowerCase())) {
                        console.log(item);
                        console.log(app.searchinventory);

                        app.searchinventory.push(item);


                    }
                })
            } else if ($('#searchBy option:selected').text().toLowerCase() === 'description') {
                this.inventory.forEach(function (item) {

                    if (item.description.toLowerCase().includes($('#searchBox').val().toLowerCase())) {
                        console.log(item);
                        console.log(app.searchinventory);
                        app.searchinventory.push(item);


                    }
                })
            } else if ($('#searchBy option:selected').text().toLowerCase() === 'category') {
                this.inventory.forEach(function (item) {

                    if (item.category.toLowerCase().includes($('#searchBox').val().toLowerCase())) {
                        console.log(item);
                        console.log(app.searchinventory);
                        app.searchinventory.push(item);


                    }
                })
            }
            else if ($('#searchBy option:selected').text().toLowerCase() === 'search by'){
                $('.searchTableHeader').text("Please select a \"Search by\" option")
            }
            else {
                //contingency text
                if (app.searchinventory.length === 0) {
                    //contingency text
                    $('.searchTableHeader').text('No Results for: \"' + $('#searchBox').val() + "\"")
                }
            }


        },


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
