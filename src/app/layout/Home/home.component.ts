import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  
  @ViewChild('audioPlayer') audioPlayer!: ElementRef;

  
  isPlaying = false;

  
  playlist: string[] = [
    'assets/music/music1.mp3',
  ];
  
  currentTrackIndex = 0;

  
  togglePlay() {
    const audio = this.audioPlayer.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  
  nextTrack() {
    this.currentTrackIndex = (this.currentTrackIndex + 1) % this.playlist.length;
    this.playCurrentTrack();
  }

  
  previousTrack() {
    this.currentTrackIndex =
      (this.currentTrackIndex - 1 + this.playlist.length) % this.playlist.length;
    this.playCurrentTrack();
  }

  
  playCurrentTrack() {
    const audio = this.audioPlayer.nativeElement;
    audio.src = this.playlist[this.currentTrackIndex];
    audio.load();
    audio.play();
    this.isPlaying = true;
  }

  
  onTrackEnded() {
    this.nextTrack();
  }
}