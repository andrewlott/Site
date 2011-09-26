


PImage img; 
ArrayList stars;
Star shooter;

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
  for(int j = 0; j<width*height; j++) {
    if( random(-1000000/(((float)height)/(j/width+10)),50) >= 0)
      stars.add(new Star( j%width,(int)j/width));
  }

} 

void draw() {
  if (random(100) > 0 && shooter == null)
    shooter = new Star((int)random(-width,0), (int)random(-height,0));
  //noLoop();
  smooth();
  image(img,0,0);

//  loadPixels();
  for(int k = 0; k < stars.size(); k++)
    ((Star)stars.get(k)).display();
  if(shooter != null)  
    shooter.shoot();
  if(shooter.x >= width && shooter.y >= height)
    shooter = null;
//  updatePixels();
  noStroke();
  fill(175,25,25);
  triangle(width*5/12,height*4/12,width*6/12,height*14/24,width*7/12,height*4/12);
  //save("test3.png");	
  
}


class Star {
  int x;
  int y;
  int brightness;

  public Star(int x1, int y1) {
    this.x = x1;
    this.y = y1;  
    this.brightness = (int)random(255);
  }
  public void display() {
    rect(x,y,1,1);
    if(random(0,100) < 1)
      brightness = (int)random(255);
    fill(color(255,255,255,brightness));
   // pixels[y*width + x] = color(255,255,255,random(255));
  }
  
  public void shoot(){
    int x = this.x;
    int y = this.y;
    int radius = 5;

    int offset = 5;
    int brightness = (int)random(128,255);
    for(int k = 1; k <= 4; k++) {
    if ( x >= 0 && x < width && y >= 0 && y < height) {
      //for(int i = -radius; i < radius; i++) {
      // for(int j = -radius; j < radius; j++) {
      //   if ( x+i >= 0 && x+i < width && y+j >= 0 && y+j < height){
               rect(x,y,1,1);
               fill(color(255,255,255,random(255/2,255)));
           //pixels[(y+j)*width + (x+i)] = color(255,255,255,brightness);
      //   }
      // }
      //}
      //pixels[y*width + x] = color(255,255,255,255);
    }
      radius-=1;
      x-=radius;
      y-=radius;
    }
    this.x+=offset;
    this.y+=offset;
  }


}
