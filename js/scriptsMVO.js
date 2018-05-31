/*
*
* 
*
*/


var data = [
    {
        name: 'Dydo',
        url: 'images/dydo.png',
        counter: 0
    },
    {
        name: 'Momo',
        url: 'images/momo.png',
        counter: 0
    },
    {
        name: 'Nano',
        url: 'images/nano.png',
        counter: 0
    },
    {
        name: 'Roro',
        url: 'images/roro.png',
        counter: 0
    },
    {
        name: 'Zazy',
        url: 'images/zazy.png',
        counter: 0
    }
];


var octopus = {
    init: function() {
        listView.render();
        displayView.init();
    },

    getCatName: function(i){
        return data[i].name;
    },

    getCatSrc: function(i) {
        return data[i].url;

    },

    getCatCounter: function(i) {
        return data[i].counter;;
    },

    setCounterValue: function(clicks, i) {
        data[i].counter = clicks;
    }
};


var listView = {
    init: function() {
        
    },

    render: function() {
        const catList = document.getElementById('cat_list');
        const catImg = document.createElement('img');
        for(let i = 0; i < data.length; i++) {
            //create list item for every cat name
            const li = document.createElement('li');

            // use octopus to get cat name from data array
            let name = octopus.getCatName(i);
            const liText = document.createTextNode(name);
            li.appendChild(liText);
            li.setAttribute('id', i);
            catList.appendChild(li);
            console.log(name);
        
            /*  add eventlistener to every list item
            *   every time we click listitem 
            *   we get its id attribute
            *   and pass it to displayView.renderImage
            *   to draw image of that index
            */
            li.addEventListener('click', function() {
                let listIndex = li.getAttribute('id');
                displayView.renderImage(listIndex);
                document.querySelector('.click_num').innerHTML = octopus.getCatCounter(listIndex);
            });  
        };
    }
};


var displayView = {
    init: function() {
        this.renderImage(0);
        this.checkclickedOne();
    },

    renderImage: function(index) {            
        // set a default cat image and display its name
        document.querySelector('.cat_name').innerHTML = octopus.getCatName(index);
        const catImg = document.querySelector('.cat_img');
        // add img to display area
        
        let imgSrc = octopus.getCatSrc(index);
        console.log(imgSrc);
        catImg.setAttribute('src', imgSrc);
        catImg.setAttribute('class', 'cat_img');
        catImg.setAttribute('alt', 'cat image');
        catImg.setAttribute('id', index);            
    },

    checkclickedOne: function() {
        // to solve this refers to displayView
        // not the document.body
        const catImg = document.querySelector('.cat_img');
        
        var self = this;
        catImg.addEventListener('click', function() {
            let clickedOne = catImg.getAttribute('id');
            self.incrementCounter(clickedOne);
            console.log(':D');
        });
        
    },

    incrementCounter: function(index) {
        let catCounter = octopus.getCatCounter(index);
        catCounter ++;
        octopus.setCounterValue(catCounter, index);
        document.querySelector('.click_num').innerHTML = octopus.getCatCounter(index);
        console.log(`first cat counter: ${octopus.getCatCounter(0)}`);            
        console.log(`second cat counter: ${octopus.getCatCounter(1)}`);
    }
};

octopus.init();