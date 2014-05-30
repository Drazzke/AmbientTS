/// <reference path="AmScene.ts"/>
/// <reference path="utils/AmPoint.ts"/>
/// <reference path="components/AmComponent.ts"/>

class AmEntity
{
    public position:AmPoint = new AmPoint(0, 0);
    public X():number { return this.position.x; }
    public Y():number { return this.position.y; }

    public active:boolean = true;
    public visible:boolean = true;
    public scene:AmScene;

    public depth:number = 0;
    public components:Array<AmComponent> = new Array<AmComponent>();

    constructor()
    {

    }

    public Start()
    {
        for (var i = 0; i < this.components.length; i ++)
        {
            this.components[i].entity = this;
            this.components[i].Start();
        }
    }
    public End()
    {

    }

    public Add(component:any)
    {
        this.components.push(component);
        if (this.scene != null)
        {
            component.entity = this;
            component.Start();
        }
    }

    public Remove(component:any)
    {
        for (var i = 0; i < this.components.length; i ++)
        {
            if (this.components[i] == component)
            {
                this.components.splice(i, 1);
                break;
            }
        }
        component.End();
        component.entity = null;
    }

    public Update()
    {
        for (var i = 0; i < this.components.length; i ++)
        {
            if (this.components[i].active)
                this.components[i].Update();
        }
    }

    public Render()
    {
        for (var i = 0; i < this.components.length; i ++)
        {
            if (this.components[i].visible)
                this.components[i].Render();
        }
    }
}