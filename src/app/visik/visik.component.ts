import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Konva from 'konva';

@Component({
  selector: 'app-visik',
  standalone: true,
  imports: [],
  templateUrl: './visik.component.html',
  styleUrl: './visik.component.css'
})
export class VisikComponent implements AfterViewInit {
  @ViewChild('stageContainer', {static: true}) stageContainer!: ElementRef;

  stage!: Konva.Stage;
  objectLayer!: Konva.Layer;

  viewport = {x: 10, y: 10, width: 500, height: 500};
  dragons: { x: number; y: number }[] = [];

  baseDragons: { x: number; y: number }[] = [
    {x: -10, y: -10},
    {x: -20, y: -2},
    {x: -30, y: -30},
    {x: 0, y: 0},
    {x: 10, y: 10},
    {x: 20, y: 20},
    {x: 30, y: 30},
    {x: 40, y: 40},
    {x: 50, y: 50},
    {x: 60, y: 60},
    {x: 70, y: 800},
  ];

  // constructor(private dragonService: DragonService) {}

  ngAfterViewInit(): void {
    this.initStage();
    this.loadDragons();


  }

  initStage(): void {
    this.stage = new Konva.Stage({
      container: this.stageContainer.nativeElement,
      width: this.viewport.width,
      height: this.viewport.height,
      draggable: true, // Позволяет перетаскивать всю сцену
    });

    this.objectLayer = new Konva.Layer();

    const backgroundRect = new Konva.Rect({
      x: -1000,
      y: -1000,
      width: 2000,
      height: 2000,
      fill: '#ff69b4',
    });

    this.objectLayer.add(backgroundRect); // Добавляем фон в слой

    this.stage.add(this.objectLayer);

    // Слушаем изменения координат
    this.stage.on('dragend', () => {
      this.updateViewport();
      this.loadDragons();
    });
  }


  updateViewport(): void {
    const position = this.stage.position();
    this.viewport.x = -position.x; // Konva возвращает отрицательные значения при перетаскивании
    this.viewport.y = -position.y;
  }

  loadDragons(): void {
    const {x, y, width, height} = this.viewport;
    const minX = x;
    const maxX = x + width;
    const minY = y;
    const maxY = y + height;

    // this.dragonService
    //   .getDragonsInArea(minX, maxX, minY, maxY)
    //   .subscribe((data) => {
    //     this.dragons = data;
    //     this.updateDragons();
    //   });
    this.dragons = this.getInArea(minX, maxX, minY, maxY);
    this.updateDragons();
  }

  getInArea(minX: number, maxX: number, minY: number, maxY: number) {
    let data = [];
    for (const dr of this.baseDragons) {
      const x = dr.x;
      const y = dr.y;
      if (minX < x && maxX > x && minY < y && maxY > y) {
        data.push(dr);
      }
    }
    return data;
  }


  updateDragons()
    :
    void {
    this.objectLayer.find('Circle').forEach((node) => node.destroy()); // Удаляем старые точки

    this.dragons.forEach((dragon) => {
      const circle = new Konva.Circle({
        x: dragon.x,
        y: dragon.y,
        radius: 5,
        fill: '#ffffff'
      });

      this.objectLayer.add(circle);
    });

    this.objectLayer.draw();
  }
}
