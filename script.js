const inputBox = document.getElementById("input-box");
  const listContainer = document.getElementById("list-container");

  function addTask(position) {
    if (inputBox.value === '') {
      alert("You must write something!");
    } else {
      let li = document.createElement("li");
      li.innerHTML = inputBox.value;
      let span = document.createElement("span");
      span.innerHTML = "\u00d7";
      li.appendChild(span);

      if (position === 'before') {
        listContainer.insertBefore(li, listContainer.firstChild);
      } else if (position === 'after') {
        listContainer.appendChild(li);
      } else if (position === 'specific') {
        let index = prompt("Enter the position (1-indexed): ");
        if (index > 0 && index <= listContainer.children.length) {
          listContainer.insertBefore(li, listContainer.children[index - 1]);
        } else {
          alert("Invalid position");
        }
      }

      inputBox.value = "";
      saveData();
    }
  }

  listContainer.addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentNode.remove();
      saveData();
    }
  }, false);

  function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
  }

  function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
  }

  showTask();

  inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask('after'); // default to adding at the end
    }
  });

  // Add buttons to add tasks at specific positions
  let addButtonBefore = document.createElement("button");
  addButtonBefore.textContent = "Add Before";
  addButtonBefore.onclick = function() {
    addTask('before');
  };
  document.getElementById("button-container").appendChild(addButtonBefore);

  let addButtonSpecific = document.createElement("button");
  addButtonSpecific.textContent = "Add at Specific Position";
  addButtonSpecific.onclick = function() {
    addTask('specific');
  };
  document.getElementById("button-container").appendChild(addButtonSpecific);
