import { Component, OnInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-anatomy',
  template: `
    <div>
    </div>
  `,
  styles: [``]
})
export class AnatomyComponent implements OnInit, OnDestroy {
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private model: THREE.Object3D;
  private loader: OBJLoader;
  private controls: OrbitControls;
  private animationFrameId: number;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    
    this.initThreeJS();
    
    this.loadModel();
    
    this.animate();
    
    this.updateSceneBackground();

    
    window.addEventListener('themeChanged', (event: any) => {
      this.updateSceneBackground();
    });
  }

  ngOnDestroy(): void {
    
    cancelAnimationFrame(this.animationFrameId);
    
    this.renderer.dispose();
    this.controls.dispose();
    
    window.removeEventListener('themeChanged', this.updateSceneBackground);
  }

  
  private initThreeJS(): void {
    
    this.scene = new THREE.Scene();

    
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 30;

    
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.el.nativeElement.appendChild(this.renderer.domElement);

    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.25;
    
    this.controls.enableZoom = false;
    this.controls.maxDistance = 30;
    this.controls.minDistance = 30;

    
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    this.scene.add(ambientLight, directionalLight);

    
    this.loader = new OBJLoader();
  }

  
  private loadModel(): void {
    this.loader.load(
      'assets/model/Zuccarello.obj',
      (obj: THREE.Object3D) => {
        this.model = obj;
        
        this.model.scale.set(0.1, 0.1, 0.1);
        this.model.position.set(0, 0, 0);
        
        this.scene.add(this.model);
      },
      (progress) => console.log('پیشرفت بارگذاری:', progress),
      (error) => console.error('خطا در بارگذاری مدل:', error)
    );
  }

  
  private animate = (): void => {
    
    this.animationFrameId = requestAnimationFrame(this.animate);
    
    this.controls.update();
    
    this.renderer.render(this.scene, this.camera);
  };

  
  private updateSceneBackground(): void {
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    this.scene.background = new THREE.Color(isDarkMode ? '#0a0d14' : '#F5F5F5');
  }

  
  @HostListener('window:resize')
  onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(width, height);
  }
}