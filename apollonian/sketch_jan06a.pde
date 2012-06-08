
//Globals
Circle edge; //The outer-soddy circle enclosing all others
ArrayList circles; //ArrayList of all circles
int count; 
int depth; 
boolean textOn; //Boolean for relative curvature text
boolean paused; //Deprecated: paused
int rate;
int lim; //Max number of "stages"

PFont font;

public void setup() {
  size(900,700);//size(round(screen.width*.9),round(screen.height*.9));
  //smooth();
  stroke(1);
  textOn = false;
  paused = false;
  font = loadFont("MonotypeGurmukhi-255.vlw");
  rate = 1;
  count = 1;
  lim = 6;
  
  circles = new ArrayList();
}

//Controls reset, pause, and curvature text
public void keyPressed(){
 if(key == 'R' || key == 'r'){
  circles = new ArrayList();
  count = 1;
 } 
 else if(key == 'T' || key == 't'){
  textOn = !textOn; 
 }
 else if(key == 'P' || key == 'p'){
   paused = !paused;
 }
}

//Only functions when placing first 3 circles
public void mouseClicked(){
  if(circles.size() < 3){
   //println(mouseX+" "+mouseY);
   circles.add(new Circle(new PVector(mouseX,mouseY),1)); 
   ((Circle)circles.get(circles.size()-1)).parents[0] = (circles.size())%4;
   ((Circle)circles.get(circles.size()-1)).parents[1] = (circles.size()+1)%4;
   ((Circle)circles.get(circles.size()-1)).parents[2] = (circles.size()+2)%4;
   ((Circle)circles.get(circles.size()-1)).id = circles.size()-1;
   if(circles.size() == 3){
    Circle a = (Circle)circles.get(0);
    Circle b = (Circle)circles.get(1);
    Circle c = (Circle)circles.get(2);
    //use this!?
    a.radius = 0.5*(-dist(c.center.x,c.center.y,b.center.x,b.center.y)+dist(c.center.x,c.center.y,a.center.x,a.center.y)+dist(b.center.x,b.center.y,a.center.x,a.center.y));
    b.radius = 0.5*(dist(c.center.x,c.center.y,b.center.x,b.center.y)-dist(c.center.x,c.center.y,a.center.x,a.center.y)+dist(b.center.x,b.center.y,a.center.x,a.center.y));
    c.radius = 0.5*(dist(c.center.x,c.center.y,b.center.x,b.center.y)+dist(c.center.x,c.center.y,a.center.x,a.center.y)-dist(b.center.x,b.center.y,a.center.x,a.center.y)); 
    circles.add(outerSoddy(a,b,c));
    ((Circle)circles.get(circles.size()-1)).id = circles.size()-1;
    //circles.add(innerSoddy(a,b,c));
    translate(width/2-((Circle)circles.get(3)).center.x,height/2-((Circle)circles.get(3)).center.y);
    for(Object circ : circles) {
     ((Circle) circ).display(); 
    }
   }
  }
}

/*

Method for generating two kinds of inner-soddy circles

*/
public Circle innerSoddy(Circle a, Circle b, Circle c){
  if(!a.outer && !b.outer && !c.outer){
  float rInner = (a.radius*b.radius*c.radius)/(a.radius*b.radius+b.radius*c.radius+c.radius*a.radius+2*sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius)));
  float area = sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius));
  float aa = dist(c.center.x,c.center.y,b.center.x,b.center.y);
  float bb = dist(c.center.x,c.center.y,a.center.x,a.center.y);
  float cc = dist(b.center.x,b.center.y,a.center.x,a.center.y);

  float s = 0.5*(aa+bb+cc);
  
  float area_s_aa = area/(s-aa);
  float area_s_bb = area/(s-bb);
  float area_s_cc = area/(s-cc);
  
  float a_asa = aa+area_s_aa;
  float b_asb = bb+area_s_bb;
  float c_asc = cc+area_s_cc;
  
  float abc_div = a_asa+b_asb+c_asc;

  PVector cInner = new PVector((a_asa*a.center.x+b_asb*b.center.x+c_asc*c.center.x)/(abc_div),
                       (a_asa*a.center.y+b_asb*b.center.y+c_asc*c.center.y)/(abc_div));
  return new Circle(cInner,rInner);
  }
  //none if all tangential on same half of outer
  Circle outer = a.outer ? a : (b.outer ? b : c);
  Circle in1 = a.outer ? b : a;
  Circle in2 = ((a.outer && b == in1) || (b.outer && a == in1)) ? c : b;
  
  float r13 = pow(in1.radius,3);
  float r23 = pow(in2.radius,3);
  float r33 = pow(outer.radius,3);
  
  float sq1 = sq(in1.radius);
  float sq2 = sq(in2.radius);
  float sq3 = sq(outer.radius);
  
  float rInner = abs((-4*sqrt(pow(in1.radius,4)*r23*r33+
                             r13*pow(in2.radius,4)*r33+
                             r13*r23*pow(outer.radius,4))
                     - in1.radius*in2.radius*outer.radius*(-2*in1.radius*in2.radius-2*in1.radius*outer.radius-2*in2.radius*outer.radius))
                     / (2*
                       (sq1*sq2-2*sq1*in2.radius*outer.radius+
                        sq1*sq3-2*in1.radius*sq2*outer.radius+
                        sq2*sq3-2*in1.radius*in2.radius*sq3)));
                        
  float area = sqrt(in1.radius*in2.radius*rInner*(in1.radius+in2.radius+rInner));
  float aa = in2.radius+rInner;
  float bb = in1.radius+rInner;
  float cc = in1.radius+in2.radius;
  float s = 0.5*(aa+bb+cc);
  
  float area_s_aa = area/(s-aa);
  float area_s_bb = area/(s-bb);
  float area_s_cc = area/(s-cc);
  
  float a_asa = aa-area_s_aa;
  float b_asb = bb-area_s_bb;
  float c_asc = cc-area_s_cc;
  
  float abc_div = a_asa+b_asb+c_asc;
  

  PVector cInner = new PVector( (outer.center.x*(abc_div)-a_asa*in1.center.x-b_asb*in2.center.x)/(c_asc),
                                (outer.center.y*(abc_div)-a_asa*in1.center.y-b_asb*in2.center.y)/(c_asc));
  //cInner = new PVector(100,100);
  //println("OUTA");
  return new Circle(cInner,rInner);
}

/*
Method for generating the single outer-soddy circle
*/
public Circle outerSoddy(Circle a, Circle b, Circle c){
  float rOuter = ((a.radius*b.radius*c.radius)/(a.radius*b.radius+b.radius*c.radius+c.radius*a.radius-2*sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius))));
  float area = sqrt(a.radius*b.radius*c.radius*(a.radius+b.radius+c.radius));
  float aa = dist(c.center.x,c.center.y,b.center.x,b.center.y);
  float bb = dist(c.center.x,c.center.y,a.center.x,a.center.y);
  float cc = dist(b.center.x,b.center.y,a.center.x,a.center.y);
  float s = 0.5*(aa+bb+cc);

  PVector cOuter = new PVector(((aa-(area/(s-aa)))*a.center.x+(bb-(area/(s-bb)))*b.center.x+(cc-(area/(s-cc)))*c.center.x)/(aa-(area/(s-aa))+bb-(area/(s-bb))+cc-(area/(s-cc))),
                       ((aa-(area/(s-aa)))*a.center.y+(bb-(area/(s-bb)))*b.center.y+(cc-(area/(s-cc)))*c.center.y)/(aa-(area/(s-aa))+bb-(area/(s-bb))+cc-(area/(s-cc))));
  return new Circle(cOuter,rOuter,true);
}


public void draw() {
  background(255);
  if(circles.size() >= 4.0){
  textFont(font);
  textAlign(LEFT,TOP);
  //text(1+count/rate,0,0);
  //println(count);
  if(count%rate == 0 && count/rate < lim-1) {
    //println("WOO");
    int s = circles.size();
    for(int i = 0; i < s; i++) {
      for(int j = i+1; j < s; j++) {
        for(int k = j+1; k < s; k++) {
          if(noneEqual(i,j,k) && isTangential((Circle)circles.get(i), (Circle)circles.get(j), (Circle)circles.get(k))) {
            Circle n = innerSoddy( (Circle)circles.get(i),(Circle)circles.get(j),(Circle)circles.get(k) );
            //n.parents = {i,j,k};
            n.parents[0] = i;
            n.parents[1] = j;
            n.parents[2] = k;
            if(!n.used()) {
              circles.add(n);  

            }
          }
        }
      }
    }
  }
  if(!paused && count/rate < lim-1) {
   //println(count++%rate);
    count++;
  }
  translate(width/2-((Circle)circles.get(3)).center.x,height/2-((Circle)circles.get(3)).center.y);
  for(int i = 0; i < circles.size(); i++) {
    ((Circle)circles.get(i)).display();
  }

  }
  else{

   for(Object circ : circles) {
    fill(0);
    ellipse(((Circle)circ).center.x,((Circle)circ).center.y,3,3);
   } 
  }
}

public boolean noneEqual(int i, int j, int k) {
 return !((i==j) || (j==k) || (i==k));
}
//Deprecated, also a mess
public boolean isTangential(Circle a, Circle b, Circle c) {
  int coeff = -2;
  return (abs(dist(a.center.x,a.center.y,b.center.x,b.center.y) - (abs(a.radius)+abs(b.radius))) <= pow(10,coeff) || ((a.outer || b.outer || c.outer) && abs(dist(a.center.x,a.center.y,b.center.x,b.center.y) - (max(abs(a.radius),abs(b.radius))-min(abs(a.radius),abs(b.radius)))) <= pow(10,coeff)))
          && (abs(dist(b.center.x,b.center.y,c.center.x,c.center.y) - (abs(b.radius)+abs(c.radius))) <= pow(10,coeff) || ((a.outer || b.outer || c.outer) && abs(dist(b.center.x,b.center.y,c.center.x,c.center.y) - (max(abs(b.radius),abs(c.radius))-min(abs(b.radius),abs(c.radius)))) <= pow(10,coeff)))
          && (abs(dist(c.center.x,c.center.y,a.center.x,a.center.y) - (abs(c.radius)+abs(a.radius))) <= pow(10,coeff) || ((a.outer || b.outer || c.outer) && abs(dist(c.center.x,c.center.y,a.center.x,a.center.y) - (max(abs(c.radius),abs(a.radius))-min(abs(c.radius),abs(a.radius)))) <= pow(10,coeff)))
          //naive
          && !(a.center.equals(b.center) || b.center.equals(c.center) || c.center.equals(a.center));
          //&& (dist( > 2*pow(10,coeff) && abs(b.center.x - c.center.x)+abs(b.center.y - c.center.y) > 2*pow(10,coeff) && abs(c.center.x - a.center.x)+abs(c.center.y - a.center.y) > 2*pow(10,coeff));
}
//Deprecated
public PVector deriveCenter(Circle a, Circle b, Circle c) {
  return new PVector(0.0,0.0);
}
//Deprecated
public float determineRadius() {return 0.0;}


public class Circle{
 /*
 The circle class! All circles have the following attrs:
 */
 PVector center; //x,y coordinates
 float radius;   //r
 boolean outer;  //is it an outer or inner circle
 int id;         //unique id
 int [] parents; //3-element array storing references to its "parent" circles
 
 //Several constructors, for various needs
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
  this.parents = new int[3];
 }

 //Method that returns if the circle is already generated
 public boolean used(){
   if(count/rate < 2){return false;}
   int num = 0;
   for(Object cir : circles) {
    Circle c = (Circle) cir;
    num = 0;   
    for(int x : this.parents){
      for(int y : c.parents){
        //print(x+" ");
        if(y == x){ num++; break;}
      }
    }
    if(num == 3) {return true;}
   }
   return false;
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
  //text(id,center.x,center.y);
  }
  noFill();
 }
  
}
