import { Component } from '@angular/core';
import { loadFull } from 'tsparticles';
import { ClickMode, HoverMode, MoveDirection, OutMode, Container, Engine } from 'tsparticles-engine';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  id = "tsparticles";

  particlesOptions = {
    background: {
      color: {
        value: "#ffffff",
      },
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: ClickMode.push,
        },
        onHover: {
          enable: true,
          mode: HoverMode.repulse,
        },
        resize: true,
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#81C6E8",
      },
      links: {
        color: "#7DE5ED",
        distance: 150,
        enable: true,
        opacity: 0.5,
        width: 1,
      },
      collisions: {
        enable: true,
      },
      move: {
        direction: MoveDirection.none,
        enable: true,
        outModes: {
          default: OutMode.bounce,
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 4, max: 4 },
      },
    },
    detectRetina: true,
  };

  particlesLoaded(container: Container): void { }

  async particlesInit(engine: Engine): Promise<void> {
    await loadFull(engine);
  }
}
