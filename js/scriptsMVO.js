/*
*
* Model
*
*/

const model = {
    cats : [
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
    ]    
}


/*
*
* Octopus
*
*/

const octopus = {
    init: function() {
        listView.init();
        displayView.init();
    },

    getCatsArray: function() {
        return model.cats;
    },

    getCatName: function(i){
        return model.cats[i].name;
    },

    getCatSrc: function(i) {
        return model.cats[i].url;

    },

    getCatCounter: function(i) {
        return model.cats[i].counter;;
    },

    setCounterValue: function(clicks, i) {
        model.cats[i].counter = clicks;
    }
};


/*
*
* View
*
*/

const listView = {
    init: function() {
        this.catList = document.getElementById('cat_list');
        this.catImg = document.createElement('img');
        this.counter = document.querySelector('.click_num');
        this.render();
    },

    render: function() {
        const cats = octopus.getCatsArray();
        for(let i = 0; i < cats.length; i++) {
            //create list item for every cat name
            const li = document.createElement('li');

            // use octopus to get cat name from data array
            let name = octopus.getCatName(i);
            const liText = document.createTextNode(name);
            li.appendChild(liText);
            li.setAttribute('id', i);
            this.catList.appendChild(li);
            console.log(name);
        
            /*  add eventlistener to every list item
            *   every time we click listitem 
            *   we get its id attribute
            *   and pass it to displayView.renderImage
            *   to draw image of that index
            */
            // to solve this refers to listView
            // inside eventListener this problem happens this lose its scope
            // not the document.body
            let self = this;
            li.addEventListener('click', function() {
                let listIndex = li.getAttribute('id');
                //draw img for the clicked one
                displayView.renderImage(listIndex);
                // get counter value for the clicked one
                self.counter.innerHTML = octopus.getCatCounter(listIndex);
                console.log( document.querySelector('.click_num').innerHTML);
            });  
        };
    }
};

const displayView = {
    init: function() {
        this.catImg = document.querySelector('.cat_img');
        this.counter = document.querySelector('.click_num');
        this.catName = document.querySelector('.cat_name')
        this.renderImage(0);
        // to solve this refers to displayView
        // not the document.body
        var self = this;
        this.catImg.addEventListener('click', function(e) {
            let clickedOne = (e.target).getAttribute('id');
            self.incrementCounter(clickedOne);
            console.log(':D');
        });
    },

    renderImage: function(listIndex) { 
        let imgSrc = octopus.getCatSrc(listIndex);          
        // set image name, src and id
        this.catName.innerHTML = octopus.getCatName(listIndex);
        this.catImg.setAttribute('src', imgSrc);
        this.catImg.setAttribute('id', listIndex);            
    },

    incrementCounter: function(index) {
        let catCounter = octopus.getCatCounter(index);
        catCounter ++;
        octopus.setCounterValue(catCounter, index);
        this.counter.innerHTML = octopus.getCatCounter(index);
        console.log(`first cat counter: ${octopus.getCatCounter(0)}`);            
        console.log(`second cat counter: ${octopus.getCatCounter(1)}`);
    }
};

octopus.init();