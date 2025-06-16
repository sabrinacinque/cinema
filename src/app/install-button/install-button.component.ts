import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-install-button',
  templateUrl: './install-button.component.html',
  styleUrls: ['./install-button.component.css'],
})
export class InstallButtonComponent implements OnInit {
  deferredPrompt: any;
  showInstallButton = false;
  deviceType = '';
  installMessage = '';

  ngOnInit() {
    this.detectDevice();
    this.setupPWAInstall();
  }

  detectDevice() {
    const userAgent = navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes('android');
    const isIOS = /ipad|iphone|ipod/.test(userAgent);
    const isChrome = userAgent.includes('chrome');
    const isSafari = userAgent.includes('safari') && !isChrome;
    const isEdge = userAgent.includes('edg/'); // Edge Chromium
    const isEdgeLegacy = userAgent.includes('edge/'); // Edge vecchio

    if (isAndroid && isChrome) {
      this.deviceType = 'android-chrome';
      this.installMessage = 'Installa App📱';
      this.showInstallButton = true;
    } else if (isAndroid) {
      this.deviceType = 'android-other';
      this.installMessage = 'Aggiungi alla Home📱';
      this.showInstallButton = true;
    } else if (isIOS && isSafari) {
      this.deviceType = 'ios-safari';
      this.installMessage = 'Aggiungi alla Home📱';
      this.showInstallButton = true;
    } else if (isIOS) {
      this.deviceType = 'ios-other';
      this.installMessage = 'Apri in Safari📱';
      this.showInstallButton = true;
    } else if (isEdge) {
      this.deviceType = 'edge-chromium';
      this.installMessage = 'Installa App📱';
      this.showInstallButton = true;
    } else if (isEdgeLegacy) {
      this.deviceType = 'edge-legacy';
      this.installMessage = 'Aggiungi collegamento🔗';
      this.showInstallButton = true;
    } else {
      this.deviceType = 'desktop';
      this.installMessage = 'Installa App💻';
      this.showInstallButton = true;
    }
  }

  setupPWAInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
    });
  }

  installApp() {
    switch (this.deviceType) {
      case 'android-chrome':
        this.installPWA();
        break;
      case 'android-other':
        this.showAndroidInstructions();
        break;
      case 'ios-safari':
        this.showIOSInstructions();
        break;
      case 'ios-other':
        this.openInSafari();
        break;
      case 'edge-chromium':
        this.installPWA(); // Funziona come Chrome
        break;
      case 'edge-legacy':
        this.showEdgeLegacyInstructions();
        break;
      case 'desktop':
        this.installPWA();
        break;
    }
  }

  installPWA() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('PWA installata!');
        }
        this.deferredPrompt = null;
      });
    } else {
      this.showManualInstructions();
    }
  }

  showAndroidInstructions() {
    alert(
      'Per installare l\'app:\n1. Tocca il menu (⋮)\n2. Seleziona "Aggiungi alla schermata Home"'
    );
  }

  showIOSInstructions() {
    alert(
      'Per installare l\'app:\n1. Tocca il pulsante Condividi (⬆️)\n2. Seleziona "Aggiungi alla schermata Home"'
    );
  }

  openInSafari() {
    alert("Per installare l'app, apri questo link in Safari");
  }
  showEdgeLegacyInstructions() {
    alert(
      'Edge non supporta PWA.\nUsa Chrome per installare l\'app, oppure:\n1. Menu (⋯)\n2. "Aggiungi a Start"'
    );
  }

  showManualInstructions() {
    alert(
      'Installazione manuale:\n1. Menu browser (⋮)\n2. "Installa app" o "Aggiungi alla schermata Home"'
    );
  }
}
