$(document).ready(function() {
    
    // --- Initial Data ---
    let tasks = [
        { id: 1, title: "Design homepage mockup", description: "Create a high-fidelity mockup in Figma.", status: "todo" },
        { id: 2, title: "Develop API endpoints", description: "Set up the user authentication endpoints.", status: "inprogress" },
        { id: 3, title: "Fix login bug", description: "Users are reporting issues with password reset.", status: "todo" },
        { id: 4, title: "Deploy to staging", description: "Push the latest build to the staging server for testing.", status: "done" }
    ];

    // --- Function to Render Tasks on the Board ---
    function renderTasks() {
        // Clear all lists first
        $('#todo-list, #inprogress-list, #done-list').empty();

        tasks.forEach(task => {
            const taskCard = `
                <li class="task-card" data-id="${task.id}">
                    <h5>${task.title}</h5>
                    <p>${task.description}</p>
                </li>
            `;
            $(`#${task.status}-list`).append(taskCard);
        });
    }

    // --- Make lists sortable and connected (Drag-and-Drop) ---
    $('.task-list').sortable({
        connectWith: ".task-list",
        placeholder: "ui-sortable-placeholder",
        receive: function(event, ui) {
            const taskId = ui.item.data('id');
            const newStatus = $(this).parent().attr('id');
            
            // Find the task in the array and update its status
            const task = tasks.find(t => t.id === taskId);
            if (task) {
                task.status = newStatus;
            }

            // Re-render to apply correct styling
            renderTasks(); 
        }
    }).disableSelection();

    // --- Handle New Task Form Submission ---
    $('#addTaskForm').on('submit', function(event) {
        event.preventDefault();
        
        const taskTitle = $('#taskTitle').val();
        const taskDescription = $('#taskDescription').val();
        
        if (taskTitle) {
            const newTask = {
                id: Date.now(), // Use timestamp for a unique ID
                title: taskTitle,
                description: taskDescription,
                status: 'todo' // New tasks always start in 'To Do'
            };
            
            tasks.push(newTask);
            renderTasks();
            
            // Hide the modal and reset the form
            const addTaskModal = bootstrap.Modal.getInstance(document.getElementById('addTaskModal'));
            addTaskModal.hide();
            $(this).trigger('reset');
        }
    });

    // --- Initial Render ---
    renderTasks();
});
