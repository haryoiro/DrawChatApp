export default class Buttons {
  private barg!: HTMLElement
  private pencil!: HTMLElement
  private eraser!: HTMLElement
  private fill!: HTMLElement
  private palatte!: HTMLElement
  private dl!: HTMLElement
  private chat!: HTMLElement
  private pencilSettingWindow!: HTMLElement
  private eraserSettingWindow!: HTMLElement
  private chatWindow!: HTMLElement

  private sliders!: any
  private penSizeText!: HTMLElement
  private eraSizeText!: HTMLElement
  private fillSizeText!: HTMLElement

  private pressureToggle!: HTMLInputElement
  constructor(public view: any) {
    this.view = view
    this.barg = <HTMLElement>document.querySelector('#barg')
    this.pencil = <HTMLElement>document.querySelector("#pencil");
    this.eraser = <HTMLElement>document.querySelector("#eraser");
    this.fill = <HTMLElement>document.querySelector("#fill");
    this.palatte = <HTMLElement>document.querySelector("#palatte");
    this.dl = <HTMLElement>document.querySelector("#download");
    this.chat = <HTMLElement>document.querySelector("#textChat");
    this.pencilSettingWindow = <HTMLElement>document.querySelector('.pencil-settings');
    this.eraserSettingWindow = <HTMLElement>document.querySelector('.eraser-settings');
    this.chatWindow = <HTMLElement>document.querySelector('.chat-window')
    this.sliders = document.getElementsByTagName('input')
    this.penSizeText = <HTMLElement>document.querySelector(".pen-size-text")
    this.eraSizeText = <HTMLElement>document.querySelector(".era-size-text")
    this.fillSizeText = <HTMLElement>document.querySelector(".fill-size-text")
    this.pressureToggle = <HTMLInputElement>document.querySelector('.pressure-toggle')
  }
  private sliderElementSetup(){
    const penSize = this.sliders[0],
      penAlpha = this.sliders[1],
      penSmooth = this.sliders[2],
      eraSize = this.sliders[4],
      eraAplha = this.sliders[5],
      eraSmooth = this.sliders[6]
    penSize.addEventListener('input', (e: Event) => {
      e.preventDefault()
      this.penSizeText.innerText = penSize.value
      this.view.penRadius = parseInt(penSize.value, 10)
    })
    eraSize.addEventListener('input', (e: Event) => {
      e.preventDefault();
      this.eraSizeText.innerText = eraSize.value
      this.view.eraRadius = parseInt(eraSize.value, 10)
    })
  }
  private toggleElementSetUp(){
    this.pressureToggle.addEventListener('change', ()=>{
      this.pressureToggle.checked ? this.view.pressureToggle = true : this.view.pressureToggle = false
    })
  }
  public elementActivate() {
    this.sliderElementSetup()
    this.toggleElementSetUp()
    this.barg.addEventListener('click', (e: Event) => {
      e.preventDefault()
      this.pencilSettingWindow.classList.toggle('show', false);
      this.eraserSettingWindow.classList.toggle('show', false);
      this.chatWindow.classList.toggle('show', false)
    })
    this.pencil.addEventListener('click', (e: Event) => {
      e.preventDefault()
      this.pencil.classList.contains('active') ? this.pencil.classList.contains(' ') : this.pencil.classList.add('active');
      if (this.pencil.classList.contains('active')) {
        this.eraser.classList.remove('active');
        this.fill.classList.remove('active');
        this.chat.classList.remove('active')
        this.pencil.classList.add('active');
        this.view.eraserToggle = false;
      }
      this.pencilSettingWindow.classList.toggle('show', true);
      this.eraserSettingWindow.classList.toggle('show', false);
      this.chatWindow.classList.toggle('show', false)
    });
    this.eraser.addEventListener('click', (e: Event) => {
      e.preventDefault()
      this.eraser.classList.contains('active') ? this.eraser.classList.contains(' ') : this.eraser.classList.add('active');
      if (this.eraser.classList.contains('active')) {
        this.pencil.classList.remove('active');
        this.fill.classList.remove('active');
        this.chat.classList.remove('active')
        this.eraser.classList.add('active');
        this.view.eraserToggle = true;
      }
      this.eraserSettingWindow.classList.toggle('show', true);
      this.pencilSettingWindow.classList.toggle('show', false);
      this.chatWindow.classList.toggle('show', false)
    });
    this.chat.addEventListener('click', (e: Event) => {
      e.preventDefault()
      this.chat.classList.contains('active') ? this.chat.classList.contains(' ') : this.chat.classList.add('active');
        if(this.chat.classList.contains('active')){
          this.pencil.classList.remove('active')
          this.fill.classList.remove('active')
          this.eraser.classList.remove('active')
          this.chat.classList.add('active')
        }
        this.chatWindow.classList.toggle('show', true)
        this.pencilSettingWindow.classList.toggle('show', false);
        this.eraserSettingWindow.classList.toggle('show', false);
    })
  }
}
