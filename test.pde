PImage img; 
ArrayList stars;
Star shooter;
int CX;
void setup() {  
  size(screen.width, screen.height); 
  frameRate(35); 
  stroke(255);
  img = createImage(width, height, RGB);
  for(int i=0; i < img.pixels.length; i++) {
    img.pixels[i] = lerpColor(color(0,0,0), color(0, 0, 35), ((float)i/img.width)/img.height); 
  }
  //image(img, 0,0);  
  stars = new ArrayList();
  //loadPixels();
  for(int j = 0; j<width*2*height; j++) {
    if( random(-1000000/(((float)height)/(j/(2*width)+10)),50) >= 0)
      stars.add(new Star( j%(width*2),(int)j/(width*2)));
  }
  smooth();
  noStroke();
  CX = width/2;
} 

void draw() {
  CX = CX-ceil((int)((CX-MX)/10));
  image(img,0,0);
  translate(-(int)CX/50,0);
  if (random(100) > 0 && shooter == null)
    shooter = new Star((int)random(-width/2,0), (int)random(-height,0));

  for(int k = 0; k < stars.size(); k++)
    ((Star)stars.get(k)).display();
  if(shooter != null)  
    shooter.shoot();
  if(shooter.x >= width*2 && shooter.y >= height)
    shooter = null;
  /*    
  fill(175,25,25);
  triangle(width*5/12,height*4/12,width*6/12,height*14/24,width*7/12,height*4/12);
  */

}


class Star {
  int x;
  int y;
  int bright;

  public Star(int x1, int y1) {
    this.x = x1;
    this.y = y1;  
    this.bright = (int)random(255);
  }
  public void display() {
    rect(x,y,1,1);
    if(random(0,500) < 1)
      bright = (int)random(255);
    fill(color(255,255,255,bright));
   // pixels[y*width + x] = color(255,255,255,random(255));
  }
  
  public void shoot(){
    int x = this.x;
    int y = this.y;
    int radius = 5;

    int offset = 5;
    for(int k = 1; k <= 4; k++) {
      if ( x >= 0 && x < width*2 && y >= 0 && y < height) {
        rect(x,y,1,1);
        fill(color(255,255,255,random(255/2,255)));
      }
      radius-=1;
      x-=radius;
      y-=radius;
    }
    this.x+=offset;
    this.y+=offset;
  }
}
