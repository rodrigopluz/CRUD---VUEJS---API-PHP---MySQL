var app = new Vue({
    el: "#root",
    data: {
        showingModal:false,
		showingeditModal: false,
		showingdeleteModal: false,
		errorMessage : "",
		successMessage : "",
		tasks: [],
		newTasks: {user: "", task: "", date: ""},
		clickedTask: {},
    },
    mounted: function () {
        // console.log("Hi KK");
        this.getAllTasks();
    },
    methods: {
        getAllTasks: function () {
            axios.get("http://localhost/api-vuejs/api.php?action=read")
                .then(function (res) {
                    console.log(res);
                    if (res.data.error) {
                        app.errorMessage = res.data.message;
                    } else {
                        app.tasks = res.data.tasks;
                    }
                });
        },
        saveTasks: function () {
            var formData = app.toFormData(app.newTasks);
            axios.post("http://localhost/api-vuejs/api.php?action=create", formData)
                .then(function (res) {
                    console.log(res);
                    app.newTasks = { user: "", task: "", date: "" };

                    if (res.data.error) {
                        app.errorMessage = res.data.message;
                    } else {
                        app.successMessage = res.data.message;
						app.getAllTasks();
                    }
                });
        },
        updateTasks: function () {
            var formData = app.toFormData(app.clickedTask);
			axios.post("http://localhost/api-vuejs/api.php?action=update", formData)
				.then(function(res){
					console.log(res);
					app.clickedTask = {};
					if (res.data.error) {
						app.errorMessage = res.data.message;
					}else{
						app.successMessage = res.data.message;
						app.getAllTasks();
					}
				});
        },
        deleteTasks: function () {
            var formData = app.toFormData(app.clickedTask);
			axios.post("http://localhost/api-vuejs/api.php?action=delete", formData)
				.then(function(res) {
					console.log(res);
					app.clickedTask = {};
					if (res.data.error) {
						app.errorMessage = res.data.message;
					} else {
						app.successMessage = res.data.message;
						app.getAllTasks();
					}
				});
        },
        selectTask(task) {
            app.clickedTask = task;
        },
        toFormData: function (obj) {
            var form_data = new FormData();
            for (var key in obj) {
                form_data.append(key, obj[key]);
            }

            return form_data;
        },
        clearMessage: function () {
            app.errorMessage = "";
            app.successMessage = "";
        }
    }
});