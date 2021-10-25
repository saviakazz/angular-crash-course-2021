import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../Task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Task[] = [];

  //Tam, kad butu galima naudoti servisa, butina ji pateikti kaip argumenta konstruktoriui
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
	//Kadangi is serviso gauname Observable tipo elementa, todėl kvieciame metoda subscribe, kad gautume norimus duomenis ir juos constantly watch it
	//(tasks) yra return value
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

  deleteTask(task: Task) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))//iš task array išfiltruoja ištrintą task'ą pagal id
      );
  }

  toggleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: Task) {
	  //(task)=> reiskia, kad turime callback funkcija this.taskService.add(task), kuri mums grazins  task'a, kuri norime UI itrauki i task'u masyva
    this.taskService.addTask(task).subscribe((task) => this.tasks.push(task));
  }
}
