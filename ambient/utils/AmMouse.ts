/// <reference path="AmPoint.ts"/>

class AmMouse
{
    public position:AmPoint = new AmPoint(0, 0);

    public leftPressed:boolean = false;
    public leftReleased:boolean = false;
    public leftDown:boolean = false;

    public rightPressed:boolean = false;
    public rightReleased:boolean = false;
    public rightDown:boolean = false;

    private canvas:HTMLElement;

    public get x():number { return this.position.x; }
    public set x(value:number) { this.position.x = value; }

    public get y():number { return this.position.y; }
    public set y(value:number) { this.position.y = value; }

    public constructor(canvas:HTMLElement)
    {
        this.canvas = canvas;

        this.canvas.onmousemove = (e:MouseEvent) =>
        {
            var viewScale = Am.GetViewportScale();
            var viewOffset:AmPoint = Am.GetViewportOffset();
            this.position = new AmPoint((e.offsetX - viewOffset.x) / viewScale + Am.camera.x, (e.offsetY - viewOffset.y) / viewScale + Am.camera.y);
        }

        this.canvas.onmousedown = (e:MouseEvent) =>
        {
            if (("which" in e && e.which == 3) || ("button" in e && e.button == 2))
            {
                this.rightPressed = true;
                this.rightDown = true;
            }
            else
            {
                this.leftPressed = true;
                this.leftDown = true;
            }
        }

        this.canvas.onmouseup = (e:MouseEvent) =>
        {
            if (("which" in e && e.which == 3) || ("button" in e && e.button == 2))
            {
                this.rightReleased = true;
                this.rightDown = false;
            }
            else
            {
                this.leftReleased = true;
                this.leftDown = false;
            }
        }
    }

    public Clear()
    {
        this.leftPressed = false;
        this.leftReleased = false;
        this.rightPressed = false;
        this.rightReleased = false;
    }
}