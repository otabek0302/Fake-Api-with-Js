//Loader
function startLoader () {
     let loader = document.querySelector('.loader')
     setTimeout(() => {
          loader.style.display = 'none';
          loader.style.transition = '20s';
     }, 200)
} 
startLoader()
let url = 'http://localhost:3001/';
     axios.get(url + 'todo')
          .then(res => {
               
               let arr = res.data;
               console.log(arr)
               reload(arr)

          })
     .catch(err => console.log(err))
//Vars
let box = document.querySelector('.box');
let inp = document.querySelector('.text');

//Finction For creating Element
function reload (obj) {
     box.innerHTML = "";
     for (let item of obj) {
          let items = document.createElement('div'),
               title_time = document.createElement('div'),
               title = document.createElement('h3'),
               time = document.createElement('small'),
               close = document.createElement('span');

          items.classList.add('items');
          items.setAttribute('id', `${item.id}`);
          title_time.classList.add('title_time');
          title.classList.add('title');
          time.classList.add('time');
          close.classList.add('close');

          title.innerHTML = item.name;
          time.innerHTML = item.time;
          close.innerHTML = '&times;';

          title_time.append(title, time);
          items.append(title_time, close);
          box.append(items);

          items.onclick = () => {
               title.classList.toggle('checked');
               if (title.classList.contains('checked')) {
                    items.style = 'background: #b2b1b1;';
                    item.isDone = true;
               } else {
                    item.isDone = false;
                    items.style = 'background: #F0F0F0;';
               }
          };

          close.onclick = (e) => {
               e.preventDefault()
               let box = document.querySelector('.items');
               let boxId = box.getAttribute("id");
               console.log(boxId);
               axios.delete(`${url}todo/${boxId}`)
                    .then(res => res.data.data, console.log(res.data + 'Delete successful'))
                    .catch(err => console.log(err));
          }
     }
}

let form = document.forms.add;

form.onsubmit = (e) => {
     e.preventDefault();
     let obj = {
          isDone: false,
          time: new Date().getHours() + ":" + new Date().getMinutes()
     };
     let fm = new FormData(form);
     fm.forEach((value, key) => {
          if (value.length > "") {
               obj[key] = value;
               inp.value = "";
          } else {
               alert(`Fill the blank don't sand empty blank`)
               return false;
          };
     });
     axios.post(url + 'todo', obj)
     .then(res => {
               
               let arr = res.data;
               reload(arr)
               startLoader()

          })
     .catch(err => console.log(err))

};

