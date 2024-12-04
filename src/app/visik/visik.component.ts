import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import Konva from 'konva';
import {NgIf} from '@angular/common';
import {NzModalComponent, NzModalService} from 'ng-zorro-antd/modal';
import {NzButtonComponent} from 'ng-zorro-antd/button';

@Component({
  selector: 'app-visik',
  standalone: true,
  imports: [
    NgIf,
    NzModalComponent,
    NzButtonComponent,
  ],
  providers: [NzModalService
  ],
  templateUrl: './visik.component.html',
  styleUrl: './visik.component.css'
})
export class VisikComponent implements AfterViewInit {
  @ViewChild('stageContainer', {static: true}) stageContainer!: ElementRef;


  stage!: Konva.Stage;
  objectLayer!: Konva.Layer;

  viewport = {x: 10, y: 10, width: 500, height: 500};
  dragons: { x: number; y: number, name: string }[] = [];


  isModalVisible = false;
  selectedDragon: { x: number; y: number; name: string } | null = null;


  baseDragons: { x: number; y: number, name: string }[] = [
    {x: -10, y: -10, name: "Zhora"},
    {x: -20, y: -2, name: "Zhora"},
    {x: -30, y: -30, name: "Zhora"},
    {x: 0, y: 0, name: "Zhora"},
    {x: 10, y: -10, name: "Zhora"},
    {x: 20, y: 20, name: "Zhora"},
    {x: 30, y: -30, name: "Zhora"},
    {x: -40, y: 40, name: "Zhora"},
    {x: 50, y: -50, name: "Zhora"},
    {x: -60, y: 60, name: "Zhora"},
    {x: 70, y: 800, name: "Zhora"},
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
      draggable: true,
    });

    this.objectLayer = new Konva.Layer();

    const backgroundRect = new Konva.Rect({
      x: -1000,
      y: -1000,
      width: 2000,
      height: 2000,
      fill: '#ff69b4',
    });

    this.objectLayer.add(backgroundRect);

    this.stage.add(this.objectLayer);

    this.stage.on('dragend', () => {
      this.updateViewport();
      this.loadDragons();
    });
  }


  updateViewport(): void {
    const position = this.stage.position();
    this.viewport.x = -position.x;
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


  updateDragons(): void {
    this.objectLayer.find('Circle').forEach((node) => node.destroy()); // Удаляем старые точки

    this.dragons.forEach((dragon) => {
      const circle = new Konva.Circle({
        x: dragon.x,
        y: dragon.y,
        radius: 5,
        fill: '#ffffff'
      });

      circle.on('mouseover', () => {
        circle.fill('blue');
        this.objectLayer.draw();
        circle.to({
          scaleX: 1.5,
          scaleY: 1.5,
          duration: 0.2,
        });
      });

      circle.on('mouseout', () => {
        circle.fill('#ffffff');
        this.objectLayer.draw();
        circle.to({
          scaleX: 1,
          scaleY: 1,
          duration: 0.2,
        });
      });

      circle.on('click', () => {
        this.selectedDragon = dragon;
        this.isModalVisible = true;
        // alert(`Вы кликнули на дракона с координатами (${dragon.x}, ${dragon.y})`);
      });


      this.objectLayer.add(circle);
    });

    this.objectLayer.draw();
  }

  closeModal(): void {
    this.isModalVisible = false;
  }
}
