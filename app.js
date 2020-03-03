var app = new Vue({
    el: "#root",
    data: {
		tasks: [],
		clickedTask: {},
		errorMessage : "",
        showingModal:false,
		successMessage : "",
		showingeditModal: false,
		showingdeleteModal: false,
		newTasks: { user: "", task: "", date: "" },
    },
    mounted: function () {
        this.getAllTasks();
    },
    methods: {
        // read - lista todos os registros
        getAllTasks: function () {
            axios.get("http://localhost/api-vuejs/api.php?action=read")
                .then(function (res) {
                    if (res.data.error) {
                        app.errorMessage = res.data.message;
                    } else {
                        app.tasks = res.data.tasks;
                    }
                });
        },
        // cread - cria um novo registro
        saveTasks: function () {
            var formData = app.toFormData(app.newTasks);
            axios.post("http://localhost/api-vuejs/api.php?action=create", formData)
                .then(function (res) {
                    app.newTasks = { user: "", task: "", date: "" };

                    if (res.data.error) {
                        app.errorMessage = res.data.message;
                    } else {
                        app.successMessage = res.data.message;
						app.getAllTasks();
                    }
                });
        },
        // update - atualiza um registro selecionado
        updateTasks: function () {
            var formData = app.toFormData(app.clickedTask);
			axios.post("http://localhost/api-vuejs/api.php?action=update", formData)
				.then(function (res) {
					app.clickedTask = {};
                    
                    if (res.data.error) {
						app.errorMessage = res.data.message;
					} else {
						app.successMessage = res.data.message;
						app.getAllTasks();
					}
				});
        },
        // delete - deleta um registro selecionado
        deleteTasks: function () {
            var formData = app.toFormData(app.clickedTask);
			axios.post("http://localhost/api-vuejs/api.php?action=delete", formData)
				.then(function (res) {
					app.clickedTask = {};
                    
                    if (res.data.error) {
						app.errorMessage = res.data.message;
					} else {
						app.successMessage = res.data.message;
						app.getAllTasks();
					}
				});
        },
        // selectTask - faz a verificação se o usuario clicou no edit ou no delete
        selectTask(task) {
            app.clickedTask = task;
        },
        // toFormData - função que verifica os parametros passados.
        toFormData: function (obj) {
            var form_data = new FormData();
            for (var key in obj) {
                form_data.append(key, obj[key]);
            }

            return form_data;
        },
        // clearMessage - mostra as mensagem de erro ou de sucesso
        clearMessage: function () {
            app.errorMessage = "";
            app.successMessage = "";
        }
    }
});