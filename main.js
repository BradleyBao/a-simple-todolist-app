$(document).ready(function () {
    let todoData = init();
    let totalID = Object.keys(todoData).length;
    const input = $("#addInput");

    runInit(todoData, totalID)

    input.focusout(function () {
        const icon = $("#add_icon");
        icon.removeClass();
        icon.addClass("fa-solid fa-plus")
    })

    input.on("focus", function () {
        console.log("Triggered")
        const icon = $("#add_icon");
        icon.removeClass();
        icon.addClass("fa-regular fa-square")
    })

    input.on("keypress", function (e) {
        const addInput = $("#addInput");
        const val = addInput.val();
        if (e.which === 13 && val !== "") {

            todoData[totalID] = {
                value : val,
                checked : false,
                date : "Today",
            }

            addData(todoData)

            const container = $("#todo_container");
            container.append(`
                    <div class="todo-list" id="${totalID}">
                        <div class="select"><i class="fa-regular fa-square selectIcon"></i></div>
                        <div class="todo-info">
                            <div class="todo-title">${val}</div>
                            <div class="some_info">
                                <span class="due"><i class="fa-regular fa-calendar"></i>Today</span>
                            </div>
                        </div>
                    </div>
                `)
            totalID++;
            addInput.val("");
        }
    })

    $("#delete_all").click(function () {
        todoData = {};
        totalID = Object.keys(todoData).length;
        runInit(todoData, totalID);
        addData(todoData);
    })

    $(document).on("click",".selectIcon", function () {
        const selfElementID = $(this).parent().parent().attr("id");
        const element = $(`#${selfElementID}`);
        const title = element.find(".todo-title");
        const icon = element.find(".selectIcon");

        if (todoData[selfElementID].checked) {
            todoData[selfElementID].checked = false;

            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                element.css("background-color", "#343434");
            } else {
                element.css("background-color", "#f8f8f8");
            }
            icon.removeClass();
            icon.addClass("fa-regular fa-square selectIcon");
            title.css("text-decoration", "none");
        } else {
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                element.css("background-color", "#232323");
            } else {
                element.css("background-color", "#c3c3c3");
            }

            icon.removeClass();
            icon.addClass("fa-solid fa-square-check selectIcon");
            title.css("text-decoration", "line-through");
            todoData[selfElementID].checked = true;
        }

        addData(todoData);
    })

    function addData(todoData) {
        let dataJson = JSON.stringify(todoData);
        localStorage.setItem("todoData", dataJson);
    }

    function runInit(todoData, totalID) {
        const container = $("#todo_container");
        container.empty();
        for (let i = 0; i < totalID; i++) {

            var key = todoData[i];

            // console.log(key)

            container.append(`
                <div class="todo-list" id="${i}">
<!--                <i class="fa-regular fa-square-check"></i>-->
<!--                <i class="fa-solid fa-square-check"></i>-->
                    <div class="select"><i class="fa-regular fa-square selectIcon"></i></div>
                    <div class="todo-info">
                        <div class="todo-title">${key.value}</div>
                        <div class="some_info">
                            <span class="due"><i class="fa-regular fa-calendar"></i>Today</span>
                        </div>
                    </div>
                </div>
            `)

            if (key.checked) {
                const element = $(`#${i}`);
                const title = element.find(".todo-title");
                const icon = element.find(".selectIcon");

                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    element.css("background-color", "#343434");
                } else {
                    element.css("background-color", "#c3c3c3");
                }
                icon.removeClass();
                icon.addClass("fa-solid fa-square-check selectIcon");
                title.css("text-decoration", "line-through");
            }

            $(".selectIcon").on("click", ".selectIcon", function () {
                const selfElementID = $(this).parent().parent().attr("id");
                console.log($(this))
                const element = $(`#${selfElementID}`);
                const title = element.find(".todo-title");
                const icon = element.find(".selectIcon");

                if (todoData[selfElementID].checked) {
                    todoData[selfElementID].checked = false;
                    element.css("background-color", "#f8f8f8");
                    icon.removeClass();
                    icon.addClass("fa-regular fa-square selectIcon");
                    title.css("text-decoration", "none");
                } else {
                    element.css("background-color", "#c3c3c3");
                    icon.removeClass();
                    icon.addClass("fa-solid fa-square-check selectIcon");
                    title.css("text-decoration", "line-through");
                    todoData[selfElementID].checked = true;
                }

                addData(todoData);
            })

        }
    }

})

function init() {
    if (localStorage.getItem("todoData") === null) {
        var dataDict = {};
        var jsonData = JSON.stringify(dataDict);
        localStorage.setItem("todoData", jsonData);
    } else {
        var data = localStorage.getItem("todoData");
        var dataDict = JSON.parse(data);
    }

    return dataDict;
}
