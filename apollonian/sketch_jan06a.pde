//given 3 circles, return the center and radius of the next circle. add this circle to list

//find 3 tangent circles
//do the rest


Circle edge;
ArrayList circles;
int count;
int depth;
boolean textOn;

PFont font;

public void setup() {
  size(900,700);//size(round(screen.width*.9),round(screen.height*.9));
  //smooth();
  stroke(1);
  textOn = false;
  font = loadFont("MonotypeGurmukhi-255.vlw");
  /*
  float r = 0;
  float rad = 0;
  do{
  circles = new ArrayList();
  edge = new Circle(width/2.0,height/2.0,width/2.0, true);
  circles.add(edge);
  
  //adding starter circles
 // float r = 10;
 
  rad+= 0.00001;
  println(rad);
  circles.add(new Circle(width/2.0,height/2.0,rad));
  
  //use while-loop to get the right radius (while !tangential)
  
  r = (((Circle)circles.get(0)).radius - ((Circle)circles.get(1)).radius)/2.0;
  float angle = radians(360/3);
  float dist = ((Circle)circles.get(1)).radius+r;
  circles.add(new Circle(width/2.0+cos(angle)*dist,height/2.0-sin(angle)*dist,r));
  angle += radians(360/3);
  circles.add(new Circle(width/2.0+cos(angle)*dist,height/2.0-sin(angle)*dist,r));
  angle += radians(360/3);
  circles.add(new Circle(width/2.0+cos(angle)*dist,height/2.0-sin(angle)*dist,r));
  }while(!isTangential(((Circle)circles.get(circles.size()-1)), ((Circle)circles.get(circles.size()-2)), ((Circle)circles.get(circles.size()-3))));
  count = 0;
  depth = 0;
  */
  circles = new ArrayList();
  /*
  Circle a = new Circle(new PVector(width/3.0,height/3.0),25.0);
  Circle b = new Circle(new PVector(width/3.0*2.0,height/3.0),25.0);
  Circle c = new Circle(new PVector(width/2.0,height/3.0*2),25.0);
  */
  
  /*
  //PVector cInner = new PVector((a.center.x/a.radius+b.center.x/b.radius+c.center.x/c.radius)/(1.0/a.radius+1.0/b.radius+1.0/c.radius),(a.center.y/a.radius+b.center.y/b.radius+c.center.y/c.radius)/(1.0/a.radius+1.0/b.radius+1.0/c.radius));
  float rInner = (a.radius*b.radius*c.radius)/(a.radius*b.radius+b.radius*c.radius+c.radius*a.radius+2*sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius)));
  //PVector cOuter = new PVector((-a.center.x/a.radius-b.center.x/b.radius-c.center.x/c.radius)/(-1.0/a.radius-1.0/b.radius-1.0/c.radius),(-a.center.y/a.radius-b.center.y/b.radius-c.center.y/c.radius)/(-1.0/a.radius-1.0/b.radius-1.0/c.radius));
  float rOuter = (a.radius*b.radius*c.radius)/(a.radius*b.radius+b.radius*c.radius+c.radius*a.radius-2*sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius)));

  float area = sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius));
  float aa = dist(c.center.x,c.center.y,b.center.x,b.center.y);
  float bb = dist(c.center.x,c.center.y,a.center.x,a.center.y);
  float cc = dist(b.center.x,b.center.y,a.center.x,a.center.y);
  float s = 0.5*(aa+bb+cc);
  
  PVector cInner = new PVector(((aa+(area/(s-aa)))*a.center.x+(bb+(area/(s-bb)))*b.center.x+(cc+(area/(s-cc)))*c.center.x)/(aa+(area/(s-aa))+bb+(area/(s-bb))+cc+(area/(s-cc))),
                       ((aa+(area/(s-aa)))*a.center.y+(bb+(area/(s-bb)))*b.center.y+(cc+(area/(s-cc)))*c.center.y)/(aa+(area/(s-aa))+bb+(area/(s-bb))+cc+(area/(s-cc))));
  PVector cOuter = new PVector(((aa-(area/(s-aa)))*a.center.x+(bb-(area/(s-bb)))*b.center.x+(cc-(area/(s-cc)))*c.center.x)/(aa-(area/(s-aa))+bb-(area/(s-bb))+cc-(area/(s-cc))),
                       ((aa-(area/(s-aa)))*a.center.y+(bb-(area/(s-bb)))*b.center.y+(cc-(area/(s-cc)))*c.center.y)/(aa-(area/(s-aa))+bb-(area/(s-bb))+cc-(area/(s-cc))));
  */   
  /*  
  Circle innerSoddy = innerSoddy(a,b,c);
  Circle outerSoddy = outerSoddy(a,b,c);
  
  translate(width/2-outerSoddy.center.x,height/2-outerSoddy.center.y);
  circles.add(outerSoddy);
  circles.add(innerSoddy);
  circles.add(a);
  circles.add(b);
  circles.add(c);
  
  for(Object circ : circles) {
   ((Circle) circ).display(); 
  }
  */
  //(new Circle(new PVector((a.center.x+b.center.x+c.center.x)/3.0,(a.center.y+b.center.y+c.center.y)/3.0),5)).display();

}

public void keyPressed(){
 if(key == 'R' || key == 'r'){
  circles = new ArrayList();
  count = 0;
 } 
 else if(key == 'T' || key == 't'){
  textOn = !textOn; 
 }

}

public void mouseClicked(){
  if(circles.size() < 3){
   println(mouseX+" "+mouseY);
   circles.add(new Circle(new PVector(mouseX,mouseY),1)); 
   if(circles.size() == 3){
    Circle a = (Circle)circles.get(0);
    Circle b = (Circle)circles.get(1);
    Circle c = (Circle)circles.get(2);
    a.radius = 0.5*(-dist(c.center.x,c.center.y,b.center.x,b.center.y)+dist(c.center.x,c.center.y,a.center.x,a.center.y)+dist(b.center.x,b.center.y,a.center.x,a.center.y));
    b.radius = 0.5*(dist(c.center.x,c.center.y,b.center.x,b.center.y)-dist(c.center.x,c.center.y,a.center.x,a.center.y)+dist(b.center.x,b.center.y,a.center.x,a.center.y));
    c.radius = 0.5*(dist(c.center.x,c.center.y,b.center.x,b.center.y)+dist(c.center.x,c.center.y,a.center.x,a.center.y)-dist(b.center.x,b.center.y,a.center.x,a.center.y)); 
    circles.add(outerSoddy(a,b,c));
    circles.add(innerSoddy(a,b,c));
    translate(width/2-((Circle)circles.get(3)).center.x,height/2-((Circle)circles.get(3)).center.y);
    for(Object circ : circles) {
     ((Circle) circ).display(); 
    }
   }
  }
}

//check if tangential
//derive lines towards centroid of other two circles
//find line intersections, that's center
//radius is dist from any circle's center minus radius to center

public Circle innerSoddy(Circle a, Circle b, Circle c){
  if(!a.outer && !b.outer && !c.outer){
  float rInner = (a.radius*b.radius*c.radius)/(a.radius*b.radius+b.radius*c.radius+c.radius*a.radius+2*sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius)));
  float area = sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius));
  float aa = dist(c.center.x,c.center.y,b.center.x,b.center.y);
  float bb = dist(c.center.x,c.center.y,a.center.x,a.center.y);
  float cc = dist(b.center.x,b.center.y,a.center.x,a.center.y);
  float s = 0.5*(aa+bb+cc);
  
  PVector cInner = new PVector(((aa+(area/(s-aa)))*a.center.x+(bb+(area/(s-bb)))*b.center.x+(cc+(area/(s-cc)))*c.center.x)/(aa+(area/(s-aa))+bb+(area/(s-bb))+cc+(area/(s-cc))),
                       ((aa+(area/(s-aa)))*a.center.y+(bb+(area/(s-bb)))*b.center.y+(cc+(area/(s-cc)))*c.center.y)/(aa+(area/(s-aa))+bb+(area/(s-bb))+cc+(area/(s-cc))));
  return new Circle(cInner,rInner);
  }
  println("OUTA");
  return new Circle(new PVector(-1000,-1000),0);
}

public Circle outerSoddy(Circle a, Circle b, Circle c){
  float rOuter = (a.radius*b.radius*c.radius)/(a.radius*b.radius+b.radius*c.radius+c.radius*a.radius-2*sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius)));
  float area = sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius));
  float aa = dist(c.center.x,c.center.y,b.center.x,b.center.y);
  float bb = dist(c.center.x,c.center.y,a.center.x,a.center.y);
  float cc = dist(b.center.x,b.center.y,a.center.x,a.center.y);
  float s = 0.5*(aa+bb+cc);
  
  PVector cOuter = new PVector(((aa-(area/(s-aa)))*a.center.x+(bb-(area/(s-bb)))*b.center.x+(cc-(area/(s-cc)))*c.center.x)/(aa-(area/(s-aa))+bb-(area/(s-bb))+cc-(area/(s-cc))),
                       ((aa-(area/(s-aa)))*a.center.y+(bb-(area/(s-bb)))*b.center.y+(cc-(area/(s-cc)))*c.center.y)/(aa-(area/(s-aa))+bb-(area/(s-bb))+cc-(area/(s-cc))));
  return new Circle(cOuter,rOuter,true);
}

//special case outer soddy
//check to make sure they're tangential
public void draw() {
  background(255);
  if(circles.size() >= 5.0){
  if(count%250 == 0) {
    println("WOO");
    int s = circles.size();
    for(int i = 0; i < s; i++) {
      for(int j = i+1; j < s; j++) {
        for(int k = j+1; k < s; k++) {
          if(noneEqual(i,j,k) && isTangential((Circle)circles.get(i), (Circle)circles.get(j), (Circle)circles.get(k))) {
            circles.add(innerSoddy( (Circle)circles.get(i),(Circle)circles.get(j),(Circle)circles.get(k) ));  
            println(i+" "+j+" "+k);
          }
          //may result in 1,2,3, 2,3,1, etc.
        }
      }
    }
  }
  translate(width/2-((Circle)circles.get(3)).center.x,height/2-((Circle)circles.get(3)).center.y);
  for(int i = 0; i < circles.size(); i++) {
    ((Circle)circles.get(i)).display();
  }
  println(count++%250);
  }
  else{

   for(Object circ : circles) {
    point(((Circle)circ).center.x,((Circle)circ).center.y);
   } 
  }
}

public boolean noneEqual(int i, int j, int k) {
 return !((i==j) || (j==k) || (i==k));
}

public boolean isTangential(Circle a, Circle b, Circle c) {
  int coeff = -2;
  return (dist(a.center.x,a.center.y,b.center.x,b.center.y) - (a.radius+b.radius) <= pow(10,coeff) || dist(a.center.x,a.center.y,b.center.x,b.center.y) - (max(a.radius,b.radius)-min(a.radius,b.radius)) <= pow(10,coeff))
          && (dist(b.center.x,b.center.y,c.center.x,c.center.y) - (b.radius+c.radius) <= pow(10,coeff) || dist(b.center.x,b.center.y,c.center.x,c.center.y) - (max(b.radius,c.radius)-min(b.radius,c.radius)) <= pow(10,coeff))
          && (dist(c.center.x,c.center.y,a.center.x,a.center.y) - (c.radius+a.radius) <= pow(10,coeff) || dist(c.center.x,c.center.y,a.center.x,a.center.y) - (max(c.radius,a.radius)-min(c.radius,a.radius)) <= pow(10,coeff));
  /*return (((sq(a.center.x-b.center.x)+sq(a.center.y-b.center.y) == sq(a.radius+b.radius)) 
           || (sq(a.center.x-b.center.x)+sq(a.center.y-b.center.y) == sq(a.radius-b.radius)))
         && ((sq(a.center.x-c.center.x)+sq(a.center.y-c.center.y) == sq(a.radius+c.radius)) 
           || (sq(a.center.x-c.center.x)+sq(a.center.y-c.center.y) == sq(a.radius-c.radius)))
         && ((sq(c.center.x-b.center.x)+sq(c.center.y-b.center.y) == sq(c.radius+b.radius)) 
           || (sq(c.center.x-b.center.x)+sq(c.center.y-b.center.y) == sq(c.radius-b.radius))));
           */
}
public PVector deriveCenter(Circle a, Circle b, Circle c) {
  return new PVector(0.0,0.0);
}

public float determineRadius() {return 0.0;}

public class Circle{
 PVector center;
 float radius;
 boolean outer;
 
 public Circle(PVector c, float r) {
  this(c.x,c.y,r); 
 }
 public Circle(float x, float y, float r) {
  this(x,y,r,false);
 }
 
 public Circle(PVector c, float r, boolean outer){
  this(c.x,c.y,r,outer); 
 }
 
 public Circle(float x, float y, float r, boolean outer) {
  this.center = new PVector(x,y);
  this.radius = r;
  this.outer = outer;
 }
 
 public void display() {
  if(!outer) {
   noFill(); 
   textAlign(CENTER);
  }
  ellipse(center.x,center.y,radius*2.0,radius*2.0);
  fill(0);
  if(textOn && !outer && abs(round(1.0/this.radius*((Circle)circles.get(3)).radius)) > 0) {

    textFont(font,this.radius*2);
        textAlign(CENTER,CENTER);
  text(1+abs(round(1.0/this.radius*((Circle)circles.get(3)).radius)),center.x,center.y); 
  }
  noFill();
 }
  
}
