# Angular2 official test demo

This project was in [angular-cli](http://origin.angular.live/resources/live-examples/testing/ts/app-specs.plnkr.html)

## Development ng test
本地运行需搭建另外的环境, 建议安装最新的@angular/cli  
使用 npm i -g @angular/cli@latest  
再使用ng init 初始化环境并安装依赖包, 将src文件夹复制过去  
也可以使用ng new XXX (XXX-工程名)  
最后使用ng test  

这里有99个测试用例,运行测试时,可不用加载这里的文件!  

###1, Angular测试入门 TDD 测试驱动开发(Test-driven development)
主要参照 : http://origin.angular.live/docs/ts/latest/guide/testing.html  

###2, 搭建测试环境  
文件配置: karma.conf, karma-test-shim, systemjs.config  
npm 包 karma.conf-> plugins  

###3,第一个Karma测试程序
	Jasmine编写的测试程序都被叫做specs, 文件名后缀必须是.spec.ts,  
	angular测试的文件类型主要有:  
	XX.component.spec.ts, XX.directive.spec.ts, XX.pipe.spec.ts, XX.service.spec.ts  
	
	使用karma测试会自动进行语法检查, 会在控制台进行输出, 黄色的是警告, 红色标识ERROR的是错误部分,需要进行修改;  
	关于语法规则, tslint.json 进行修改 ?
	http://origin.angular.live/docs/ts/latest/guide/style-guide.html  建议都按照这上面的格式书写  
	
###4, Angular测试工具
TestBed创建Angular测试模块 - @NgModule类 - 通过配置它，你为想要测试的类创造模块环境。   
默认配置只是测试应用的基础。通过TestBed创建被测试的组件的实例，并使用测试程序来测探这个实例。  
在TestBed.configureTestingModule中定义额外 imports、declarations、providers和schemas的对象，构建适合你的应用程序的测试环境.  

http://origin.angular.live/docs/ts/latest/api/ api接口文档,  

###5, 例子应用及其测试
  孤立的单元测试  
```
describe('Service: base-data-remote', () => {  
  let service = new BaseDataRemoteService();  
  
  it('should be created',() => {  
	expect(service).toBeTruthy();  
  });  
});  
```
###6, 简单的组件测试程序
	组件负责控制屏幕上的一小块区域，我们称之为视图。  
	引入需要的类, (格式,从库里引入的类,与自定义文件的类间空一行)

	import { TestBed, ComponentFixture, async } from '@angular/core/testing';  
	import { By } from '@angular/platform-browser';  
	import { DebugElement } from '@angular/core';  
	
	import { BannerComponent } from './banner.component';  
	  
	let comp:    BannerComponent;  
	let fixture: ComponentFixture<BannerComponent>;  
	let de:      DebugElement;  
	let el:      HTMLElement; //(原生js原型链上的方法)  
	
	describe('BannerComponent', () => {
	  beforeEach(() => {
		TestBed.configureTestingModule({
		  declarations: [ BannerComponent ], // declare the test component
		});

		fixture = TestBed.createComponent(BannerComponent);

		comp = fixture.componentInstance; // BannerComponent test instance

		// query for the title <h1> by CSS element selector
		de = fixture.debugElement.query(By.css('h1'));
		el = de.nativeElement;
	  });
	});
  
	添加全局变量, src\typings.d.ts 中添加,使用 declare 类型说明;
	主要方法:
	TestBed.configureTestingModule
	TestBed.createComponent
	ComponentFixture, DebugElement, query(By.css)
	
	TestBed.createComponent创建BannerComponent组件的实例，可以用来测试和返回fixture。 
	TestBed.createComponent关闭当前TestBed实例，让它不能再被配置。 
	query方法接受predicate函数，并搜索fixture的整个DOM树，试图寻找第一个满足predicate函数的元素。 
	queryAll方法返回一列数组，包含所有DebugElement中满足predicate的元素。 
	By类是Angular测试工具之一，它生成有用的predicate。
  它的By.css静态方法产生标准CSS选择器 predicate，与JQuery选择器相同的方式过滤。  
	用CSS选择器从fixture的DebugElement中query  
	fixture.detectChanges：在测试中的Angular变化检测。 
		
	autoDetectChanges 自动检测
	fixture = TestBed.configureTestingModule({
	  declarations: [ BannerComponent ],
	  providers: [
		{ provide: ComponentFixtureAutoDetect, useValue: true } //ComponentFixtureAutoDetect
	  ]
	})
	
	it('should display original title', () => {
	  // Hooray! No `fixture.detectChanges()` needed 自动检测
	  expect(el.textContent).toContain(comp.title);
	});

	it('should still see original title after comp.title change', () => {
	  const oldTitle = comp.title;
	  comp.title = 'Test Title';
	  // Displayed title is old because Angular didn't hear the change :(
	  expect(el.textContent).toContain(oldTitle);
	});

	it('should display updated title after detectChanges', () => {
	  comp.title = 'Test Title';
	  fixture.detectChanges(); // detect changes explicitly
	  expect(el.textContent).toContain(comp.title);
	});
	
###7, 测试拥有服务依赖的组件

	eg.
	import { Component, OnInit } from '@angular/core';
	import { UserService }       from './model';

	@Component({
	  selector: 'app-welcome',
	  template: '<h3 class="welcome" ><i>{{welcome}}</i></h3>'
	})
	export class WelcomeComponent  implements OnInit {
	  welcome = '-- not initialized yet --';
	  constructor(private userService: UserService) { }

	  ngOnInit(): void {
	    this.welcome = this.userService.isLoggedIn ?
	      'Welcome, ' + this.userService.user.name :
	      'Please log in.';
	  }
	}

	TestBed.configureTestingModule({
	   declarations: [ WelcomeComponent ],
	// providers:    [ UserService ]  // NO! Don't provide the real service!
									  // Provide a test-double instead
	   providers:    [ {provide: UserService, useValue: userServiceStub } ]
	});
	测试复制品 定义 userServiceStub 的值
	获取注入的服务 userService = fixture.debugElement.injector.get(UserService);
	可以通过TestBed.get方法来从根注入器中获取服务 userService = TestBed.get(UserService); 

	it('should welcome the user', () => {
	  fixture.detectChanges();
	  const content = el.textContent;
	  expect(content).toContain('Welcome', '"Welcome ..."');
	  expect(content).toContain('Test User', 'expected name');
	});

	it('should welcome "Bubba"', () => {
	  userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
	  fixture.detectChanges();
	  expect(el.textContent).toContain('Bubba');
	});

	it('should request login if not logged in', () => {
	  userService.isLoggedIn = false; // welcome message hasn't been shown yet
	  fixture.detectChanges();
	  const content = el.textContent;
	  expect(content).not.toContain('Welcome', 'not welcomed');
	  expect(content).toMatch(/log in/i, '"log in"');
	});

Jasmine的it方法的第二个参数（比如'expected name'）是可选附加参数。
如果这个期待失败了，Jasmine在期待失败信息后面显示这个附加参数。
在拥有多个期待的spec中，它可以帮助澄清发生了什么错误，哪个期待失败了。

###8, 测试拥有异步服务的组件
	eg. app/shared/twain.component.ts
	@Component({
	  selector: 'twain-quote',
	  template: '<p class="twain"><i>{{quote}}</i></p>'
	})
	export class TwainComponent  implements OnInit {
	  intervalId: number;
	  quote = '...';
	  constructor(private twainService: TwainService) { }

	  ngOnInit(): void {
		this.twainService.getQuote().then(quote => this.quote = quote);
	  }
	}
	
	spec. app/shared/twain.component.spec.ts (setup)
	beforeEach(() => {
		TestBed.configureTestingModule({
		   declarations: [ TwainComponent ],
		   providers:    [ TwainService ],
		});

		fixture = TestBed.createComponent(TwainComponent);
		comp    = fixture.componentInstance;

		// TwainService actually injected into the component
		twainService = fixture.debugElement.injector.get(TwainService);

		// Setup spy on the `getQuote` method
		spy = spyOn(twainService, 'getQuote')
			  .and.returnValue(Promise.resolve(testQuote));

		// Get the Twain quote element by CSS selector (e.g., by class name)
		de = fixture.debugElement.query(By.css('.twain'));
		el = de.nativeElement;
	});
	
	whenStable
	fakeAsync
	tick
	刺探(Spy)真实服务,
	伪造服务实例和刺探真实服务都是好方法。挑选一种对当前测试套件最简单的方法。你可以随时改变主意。
	  it('should not show quote before OnInit', () => {
		expect(el.textContent).toBe('', 'nothing displayed');
    //** returns false if the spy has not been called at all
		expect(spy.calls.any()).toBe(false, 'getQuote not yet called');
	  });
	  it('should still not show quote after component initialized', () => {
		fixture.detectChanges();
		// getQuote service is async => still has not returned with quote
		expect(el.textContent).toBe('...', 'no quote yet');
		expect(spy.calls.any()).toBe(true, 'getQuote called');
	  });
	  it('should show quote after getQuote promise (async)', async(() => {
		fixture.detectChanges();
		fixture.whenStable().then(() => { //** wait for async getQuote所有待处理异步行为完成时
		  fixture.detectChanges();        // update view with quote
		  expect(el.textContent).toBe(testQuote);
		});
	  }));
	  it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
		fixture.detectChanges();
		tick();                  //** wait for async getQuote
		fixture.detectChanges(); // update view with quote
		expect(el.textContent).toBe(testQuote);
	  }));
	  it('should show quote after getQuote promise (done)', done => {
		fixture.detectChanges();

		// get the spy promise and wait for it to resolve
		spy.calls.mostRecent().returnValue.then(() => {
		  fixture.detectChanges(); // update view with quote
		  expect(el.textContent).toBe(testQuote);
		  done(); 
      //可以将接受 done回调的函数传给it。 但是，你必须链接承诺、处理错误，并在适当的时候调用done。比较少用
		});
	  });
	async 方法
	async函数接受无参数的函数方法，返回无参数的函数方法，变成Jasmine的it函数的参数。

	fakeAsync是另一种Angular测试工具。
	和async一样，它也接受无参数函数并返回一个函数，变成Jasmine的it函数的参数。
	fakeAsync函数通过在特殊的fakeAsync测试区域运行测试程序，让测试代码更加简单直观。
	对于async来说，fakeAsync最重要的好处是测试程序看起来像同步的。里面没有任何承诺。 没有then(...)链来打断控制流。
	tick 函数是Angular测试工具之一，是fakeAsync的同伴。 它只能在fakeAsync的主体中被调用。
	调用tick()模拟时间的推移，直到全部待处理的异步任务都已完成
	
	spy方法
	可以查jasmine的api接口方法 https://jasmine.github.io/2.5/introduction
	
	
	jasmine.done 传统的Jasmine异步测试技术
	可以将接受 done回调的函数传给it。 但是，你必须链接承诺、处理错误，并在适当的时候调用done。

###9, 测试拥有外部模板的组件
	TestBed.createComponent是一种同步的方法。它假设所有它需要的资源已经全部在内存。
	TestBed.compileComponents方法异步编译所有当前测试模块配置的组件。
  完成编译后，外部模板和CSS文件就已经被内联进来， 然后TestBed.createComponent就可以异步的完成它的任务了。
  
	beforeEach( async(() => {
	  TestBed.configureTestingModule({
		declarations: [ DashboardHeroComponent ],
	  })
	  .compileComponents(); // compile template and css
	}));
  
	因为异步方法TestBed.compileComponents而必需在beforeEach里面对async的调用。
  async函数将测试代码安排到特殊的异步测试区域来运行，该区域隐藏了异步执行的细节，就像它被传递给it 测试一样。
	
	async in beforeEach
	compileComponents

###10, 测试拥有导入inputs和导出outputs的组件

	@Component({
	  moduleId: module.id,
	  selector:    'dashboard-hero',
	  templateUrl: 'dashboard-hero.component.html',
	  styleUrls: [ 'dashboard-hero.component.css' ]
	})
	export class DashboardHeroComponent {
	  @Input() hero: Hero;
	  @Output() selected = new EventEmitter<Hero>();
	  click() { this.selected.emit(this.hero); }
	}
	
	beforeEach( async(() => {
	  TestBed.configureTestingModule({
		declarations: [ DashboardHeroComponent ],
	  })
	  .compileComponents(); // compile template and css
	}));
	it('should display hero name', () => {
	  const expectedPipedName = expectedHero.name.toUpperCase();
	  expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
	});
	
	
	/** Button events to pass to `DebugElement.triggerEventHandler` for RouterLink event handler */
	export const ButtonClickEvents = {
	   left:  { button: 0 },
	   right: { button: 2 }
	};

	/** Simulate element click. Defaults to mouse left-button click event. */
	export function click(el: DebugElement | HTMLElement, eventObj: any = ButtonClickEvents.left): void {
	  if (el instanceof HTMLElement) {
		el.click();
	  } else {
		el.triggerEventHandler('click', eventObj);
	  }
	}
	
	it('should raise selected event when clicked', () => {
	  let selectedHero: Hero;
	  comp.selected.subscribe((hero: Hero) => selectedHero = hero);

	  click(heroEl);   // triggerEventHandler helper
	  expect(selectedHero).toBe(expectedHero);
	});
  
	*triggerEventHandler*
	Angular的DebugElement.triggerEventHandler可以用事件的名字触发任何数据绑定事件。 第二个参数是传递给事件处理器的事件对象。
###11, 在宿主组件中测试组件

	@Component({
	  template: `
		<dashboard-hero  [hero]="hero"  (selected)="onSelected($event)"></dashboard-hero>`
	})
	class TestHostComponent {
	  hero = new Hero(42, 'Test Name');
	  selectedHero: Hero;
	  onSelected(hero: Hero) { this.selectedHero = hero; }
	}
  
	配置使用测试宿主的测试程序与配置孤立测试相似，不用理会Router、HeroService服务，甚至*ngFor循环。
  
	beforeEach( async(() => {
	  TestBed.configureTestingModule({
		declarations: [ DashboardHeroComponent, TestHostComponent ], // declare both
	  }).compileComponents();
	}));

	beforeEach(() => {
	  // create TestHostComponent instead of DashboardHeroComponent
	  fixture  = TestBed.createComponent(TestHostComponent);
	  testHost = fixture.componentInstance;
	  heroEl   = fixture.debugElement.query(By.css('.hero')); // find hero
	  fixture.detectChanges(); // trigger initial data binding
	});
  
###12, 测试带路由器的组件

	eg. code
	constructor(
	  private router: Router,
	  private heroService: HeroService) {
	}
	gotoDetail(hero: Hero) {
	  let url = `/heroes/${hero.id}`;
	  this.router.navigateByUrl(url);
	}
	
	sepc
	beforeEach( async(() => {
		TestBed.configureTestingModule({
		providers: [
		  { provide: HeroService, useClass: FakeHeroService },
		  { provide: Router,      useClass: RouterStub }
		]
	})
	.compileComponents().then(() => {
		fixture = TestBed.createComponent(DashboardComponent);
		comp = fixture.componentInstance;
	});
	it('should tell ROUTER to navigate when hero clicked',
	  inject([Router], (router: Router) => { // ...

	  const spy = spyOn(router, 'navigateByUrl');

	  heroClick(); // trigger click on first inner <div class="hero">

	  // args passed to router.navigateByUrl()
	  const navArgs = spy.calls.first().args[0];

	  // expecting to navigate to id of the component's first hero
	  const id = comp.heroes[0].id;
	  expect(navArgs).toBe('/heroes/' + id,
		'should nav to HeroDetail for first hero');
	}));
  
	_inject_
inject函数是Angular测试工具之一。 它注入服务到测试函数，以供修改、监视和操纵。
inject函数有两个参数：
一个是，一列数组，包含了Angular依赖注入令牌
另一个是，一个测试函数，它的参数与注入令牌数组里的每个项目严格的一一对应。

###13, 测试带有路由和路由参数的组件

	constructor(
	  private heroDetailService: HeroDetailService,
	  private route:  ActivatedRoute,
	  private router: Router) {
	}
	ngOnInit(): void {
	  // get hero when `id` param changes
	  this.route.params.pluck<string>('id')
	    .forEach(id => this.getHero(id))
	    .catch(() => this.hero = new Hero()); // no id; should edit new hero
	}

可观察测试复制品

spec
  
###14, 使用page对象来简化配置
```
class Page {
  gotoSpy:      jasmine.Spy;
  navSpy:       jasmine.Spy;
  saveSpy:      jasmine.Spy;

  saveBtn:      DebugElement;
  cancelBtn:    DebugElement;
  nameDisplay:  HTMLElement;
  nameInput:    HTMLInputElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const hds          = compInjector.get(HeroDetailService);
    const router       = compInjector.get(Router);

    this.gotoSpy       = spyOn(comp, 'gotoList').and.callThrough();
    this.navSpy        = spyOn(router, 'navigate');
    this.saveSpy       = spyOn(hds, 'saveHero').and.callThrough();
  }

  /** Add page elements after hero arrives */
  addPageElements() {
    if (comp.hero) {
      // have a hero so these elements are now in the DOM
      const buttons    = fixture.debugElement.queryAll(By.css('button'));
      this.saveBtn     = buttons[0];
      this.cancelBtn   = buttons[1];
      this.nameDisplay = fixture.debugElement.query(By.css('span')).nativeElement;
      this.nameInput   = fixture.debugElement.query(By.css('input')).nativeElement;
    }
  }
}
function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  comp    = fixture.componentInstance;
  page    = new Page();

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
    page.addPageElements();
  });
}
```
###15, 用模块的导入进行配置
###16, 重载组件提供商
###17, 测试带有RouterOutlet组件
	模拟不需要的组件
	模拟RouterLink
	By.directive和注入的指令
###18, 使用NO_ERRORS_SCHEMA来“浅化”组件测试程序
###19, 测试属性指令
###20, 孤立的单元测试
	服务
	管道:
管道很容易测试，无需Angular测试工具。

管道类有一个方法，transform，用来转换输入值到输出值。 transform的实现很少与DOM交互。
除了@Pipe元数据和一个接口外，大部分管道不依赖Angular。

```
eg.
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'titlecase', pure: false})
/** Transform to Title Case: uppercase the first letter of the words in a string.*/
export class TitleCasePipe implements PipeTransform {
  transform(input: string): string {
	return input.length === 0 ? '' :
	  input.replace(/\w\S*/g, (txt => txt[0].toUpperCase() + txt.substr(1).toLowerCase() ));
  }
}
spec.
describe('TitleCasePipe', () => {
  // This pipe is a pure, stateless function so no need for BeforeEach
  let pipe = new TitleCasePipe();
  it('transforms "abc" to "Abc"', () => {
	expect(pipe.transform('abc')).toBe('Abc');
  });
  it('transforms "abc def" to "Abc Def"', () => {
	expect(pipe.transform('abc def')).toBe('Abc Def');
  });
  // ... more tests ...
});
```
###21, Angular测试工具APIs
	独立函数: async, fakeAsync, etc.
	TestBed
	ComponentFixture
	DebugElement



