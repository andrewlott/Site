/*
Written by Andrew Lott in the winter of 2009/2010
 Last updated: winter 2010/2011
 
 */

HashMap converter = new HashMap();
String s = "";
PFont font;
/* @pjs preload="img/500px-KB_United_States_Dvorak.png"; */
/* @pjs font="CourierNew.ttf"; */
PImage img;
int image_x = 70;
int image_y = 480-35-167;

void setup() {
  size(640,480);
  hashify();
  //font = loadFont("Courier-24.vlw");
  //textFont(font);
  textFont(createFont("CourierNew",24));
  img = loadImage("img/500px-KB_United_States_Dvorak.png");
  noStroke();
}

void hashify() {
  converter.put('q', "\'"); 
  converter.put('w', ",");
  converter.put('e', ".");
  converter.put('r', "p");
  converter.put('t', "y");
  converter.put('y', "f");
  converter.put('u', "g");
  converter.put('i', "c");
  converter.put('o', "r");
  converter.put('p', "l");
  converter.put('[', "/"); 
  converter.put(']', "=");
  converter.put('\\', "\\");
  converter.put('a', "a");
  converter.put('s', "o");
  converter.put('d', "e");
  converter.put('f', "u");
  converter.put('g', "i");
  converter.put('h', "d");
  converter.put('j', "h");
  converter.put('k', "t");
  converter.put('l', "n");
  converter.put(';', "s");
  converter.put('\'', "-");
  converter.put('z', ");");
  converter.put('x', "q");
  converter.put('c', "j");
  converter.put('v', "k");
  converter.put('b', "x");
  converter.put('n', "b");
  converter.put('m', "m");
  converter.put(',', "w");
  converter.put('.', "v");
  converter.put('/', "z");
  converter.put('Q', "\"");
  converter.put('W', "<");		
  converter.put('E', ">");
  converter.put('R', "P");
  converter.put('T', "Y");
  converter.put('Y', "F");
  converter.put('U', "G");
  converter.put('I', "C");
  converter.put('O', "R");
  converter.put('P', "L");
  converter.put('{', "?");
  converter.put('}', "+");
  converter.put('|', "|");
  converter.put('A', "A");
  converter.put('S', "O");
  converter.put('D', "E");
  converter.put('F', "U");
  converter.put('G', "I");
  converter.put('H', "D");
  converter.put('J', "H");
  converter.put('K', "T");
  converter.put('L', "N");
  converter.put(':', "S");
  converter.put('"', "_");
  converter.put('Z', ":");
  converter.put('X', "Q");
  converter.put('C', "J");
  converter.put('V', "K");
  converter.put('B', "X");
  converter.put('N', "B");
  converter.put('M', "M");
  converter.put('<', "W");
  converter.put('>', "V");
  converter.put('?', "Z");
  converter.put('-', "[");
  converter.put('_', "{");
  converter.put('=', "]");
  converter.put('+', "}");	
  converter.put(TAB, "\t");
}

float text_y = 30;

void draw() {
  background(255);
  fill(0,0,0);
  text(s,10,text_y,620,500);
  image(img, image_x, image_y);
  //text(mouseX + "," + mouseY, mouseX, mouseY + 5);
  if(keyPressed)
    highlight(key);
}

int enters = 0;

void keyPressed() {
  if(key != CODED) {
    if(key == '\n')
      enters++;
    if(enters > 8) {
      enters--;
      while(s.charAt(0) != '\n')
        s = s.substring(1);
      s = s.substring(1);
    }
  }
  if((key == DELETE || key == BACKSPACE) && s.length() != 0) {
    if(s.charAt(s.length()-1) == '\n')
      enters--;
    s = s.substring(0, s.length()-1);
  }
  else
    toDVORAK();
}

void toDVORAK(){
  if (converter.containsKey(key))
    s += converter.get(key);
  else if (key < 128)
    s += char(key);
  /*
  if(key == 'q')
   s+="\'";
   else if(key == 'w')
   s+=",";		
   else if(key == 'e')
   s+=".";
   else if(key == 'r')
   s+="p";
   else if(key == 't')
   s+="y";
   else if(key == 'y')
   s+="f";
   else if(key == 'u')
   s+="g";
   else if(key == 'i')
   s+="c";
   else if(key == 'o')
   s+="r";
   else if(key == 'p')
   s+="l";
   else if(key == '[')
   s+="/"; 
   else if(key == ']')
   s+="=";
   else if(key == '\\')
   s+="\\";
   else if(key == 'a')
   s+="a";
   else if(key == 's')
   s+="o";
   else if(key == 'd')
   s+="e";
   else if(key == 'f')
   s+="u";
   else if(key == 'g')
   s+="i";
   else if(key == 'h')
   s+="d";
   else if(key == 'j')
   s+="h";
   else if(key == 'k')
   s+="t";
   else if(key == 'l')
   s+="n";
   else if(key == ';')
   s+="s";
   else if(key == '\'')
   s+="-";
   else if(key == 'z')
   s+=";";
   else if(key == 'x')
   s+="q";
   else if(key == 'c')
   s+="j";
   else if(key == 'v')
   s+="k";
   else if(key == 'b')
   s+="x";
   else if(key == 'n')
   s+="b";
   else if(key == 'm')
   s+="m";
   else if(key == ',')
   s+="w";
   else if(key == '.')
   s+="v";
   else if(key == '/')
   s+="z";
   else if(key == 'Q')
   s+="\"";
   else if(key == 'W')
   s+="<";		
   else if(key == 'E')
   s+=">";
   else if(key == 'R')
   s+="P";
   else if(key == 'T')
   s+="Y";
   else if(key == 'Y')
   s+="F";
   else if(key == 'U')
   s+="G";
   else if(key == 'I')
   s+="C";
   else if(key == 'O')
   s+="R";
   else if(key == 'P')
   s+="L";
   else if(key == '{')
   s+="?";
   else if(key == '}')
   s+="+";
   else if(key == '|')
   s+="|";
   else if(key == 'A')
   s+="A";
   else if(key == 'S')
   s+="O";
   else if(key == 'D')
   s+="E";
   else if(key == 'F')
   s+="U";
   else if(key == 'G')
   s+="I";
   else if(key == 'H')
   s+="D";
   else if(key == 'J')
   s+="H";
   else if(key == 'K')
   s+="T";
   else if(key == 'L')
   s+="N";
   else if(key == ':')
   s+="S";
   else if(key == '"')
   s+="_";
   else if(key == 'Z')
   s+=":";
   else if(key == 'X')
   s+="Q";
   else if(key == 'C')
   s+="J";
   else if(key == 'V')
   s+="K";
   else if(key == 'B')
   s+="X";
   else if(key == 'N')
   s+="B";
   else if(key == 'M')
   s+="M";
   else if(key == '<')
   s+="W";
   else if(key == '>')
   s+="V";
   else if(key == '?')
   s+="Z";
   else if((key == DELETE || key == BACKSPACE) && s.length() != 0) {
   if(s.charAt(s.length()-1) == '\n')
   enters--;
   s = s.substring(0, s.length()-1);
   }
   else if(key == '-')
   s+="[";
   else if(key == '_')
   s+="{";
   else if(key == '=')
   s+="]";
   else if(key == '+')
   s+="}";	
   else if(key == TAB)
   s+= "\t";
   else
   s+= ""+char(key);
   */
}

//coloring problem is due to incorrect adding of image_x and x
void highlight(char k) {
  float key1 = 33.25f;
  float delt = 2*key1;
  float tab = 1.5f*key1;
  float enter = delt*8/7;
  float shift = tab*5/6;
  float cntrl = tab;
  float alt = cntrl;
  float com = key1;
  float x = 0.0f;
  float y = 0.0f;

  if(k == '`' || k == '~' || k == '1' || k == '!' || k == '2' || k == '@' || k == '3' || k == '#' || k == '4' || k == '$' || k == '5' || k == '%' || 
    k == '6' || k == '^' || k == '7' || k == '&' || k == '8' || k == '*' || k == '9' || k == '(' || k == '0' || k == ')' || k == '-' || k == '_' || 
    k == '=' || k == '+' || k == delt || k == BACKSPACE) {

    y = 0;
    
    switch(k) {
    default:
      x+=key1;
    case '=':
    case '+':
      x+=key1;
    case '-':
    case '_':
      x+=key1;
    case '0':
    case ')':
      x+=key1;
    case '9':
    case '(':
      x+=key1;
    case '8':
    case '*':
      x+=key1;
    case '7':
    case '&':
      x+=key1;
    case '6':
    case '^':
      x+=key1;
    case '5':
    case '%':
      x+=key1;
    case '4':
    case '$':
      x+=key1;
    case '3':
    case '#':
      x+=key1;
    case '2':
    case '@':
      x+=key1;
    case '1':
    case '!':
      x+=key1;
    case '`':
    case '~':

    }
  }
  else if(k == TAB || k == 'q' || k == 'Q' || k == 'w' || k == 'W' || k == 'e' || k == 'E' || k == 'r' || k == 'R' || k == 't' || k == 'T' || k == 'y' || 
    k == 'Y' || k == 'u' || k == 'U' || k == 'i' || k == 'I' || k == 'o' || k == 'O' || k == 'p' || k == 'P' || k == '[' || k == '{' || k == ']' || 
    k == '}' || k == '\\' || k == '|') {

    y = key1;
    if(key != TAB)
      x += tab/3;
    switch(key) {
    case '\\':
    case '|':
      x+=key1;
    case ']':
    case '}':
      x+=key1;
    case '[':
    case '{':
      x+=key1;
    case 'p':
    case 'P':
      x+=key1;
    case 'o':
    case 'O':
      x+=key1;
    case 'i':
    case 'I':
      x+=key1;
    case 'u':
    case 'U':
      x+=key1;
    case 'y':
    case 'Y':
      x+=key1;
    case 't':
    case 'T':
      x+=key1;
    case 'r':
    case 'R':
      x+=key1;
    case 'e':
    case 'E':
      x+=key1;
    case 'w':
    case 'W':
      x+=key1;
    case 'q':
    case 'Q':
      x+=key1;
    }
  }
  else if(key == 'a' || key == 'A' || key == 's' || key == 'S' || key == 'd' || key == 'D' || key == 'f' || key == 'F' || key == 'g' || key == 'G' || key == 'h' || key == 'H' || 
    key == 'j' || key == 'J' || key == 'k' || key == 'K' || key == 'l' || key == 'L' || key == ';' || key == ':' || key == '\'' || key == '"' || key == '\n' || (key == CODED && keyCode == 20)) {

    y = key1*2;
    x+= tab*.5f;
    switch(key) {
    case '\n':
      x+=key1;
    case '\'':
    case '"':
      x+=key1;
    case ';':
    case ':':
      x+=key1;
    case 'l':
    case 'L':
      x+=key1;
    case 'k':
    case 'K':
      x+=key1;
    case 'j':
    case 'J':
      x+=key1;
    case 'h':
    case 'H':
      x+=key1;
    case 'g':
    case 'G':
      x+=key1;
    case 'f':
    case 'F':
      x+=key1;
    case 'd':
    case 'D':
      x+=key1;
    case 's':
    case 'S':
      x+=key1;
    case 'a':
    case 'A':
      x+=key1;
    }
  }
  else if((key == 'z' || key == 'Z' || key == 'x' || key == 'X' || key == 'c' || key == 'C' || key == 'v' || key == 'V' || key == 'b' || key == 'B' || key == 'n' || key == 'N' || 
    key == 'm' || key == 'M' || key == ',' || key == '<' || key == '.' || key == '>' || key == '/' || key == '?') || key == CODED && keyCode == SHIFT) {

    y = key1*3;
    x+=shift;
    if(key == CODED && keyCode == SHIFT)
      x+=11*key1;
    switch(key) {
    case '/':
    case '?':
      x+=key1;
    case '.':
    case '>':
      x+=key1;
    case ',':
    case '<':
      x+=key1;
    case 'm':
    case 'M':
      x+=key1;
    case 'n':
    case 'N':
      x+=key1;
    case 'b':
    case 'B':
      x+=key1;
    case 'v':
    case 'V':
      x+=key1;
    case 'c':
    case 'C':
      x+=key1;
    case 'x':
    case 'X':
      x+=key1;
    case 'z':
    case 'Z':
      x+=key1;
    }
  }
  else if(key == ' ' || (key == CODED && (keyCode == CONTROL || keyCode == ALT || keyCode == 157))) { //157 is for command

    y = key1*4;
    switch(keyCode) {
    case ALT:
      x+=com;
    case 157:
      x+=tab;
    }
    if(key == ' ')
      x+= cntrl + alt + com;
  }

  fill(255,255,0,150);
  if(key == TAB || key == '\\' || key == '|')
    rect(image_x + x, image_y + y,tab,key1);
  else if(key == delt || key == BACKSPACE)
    rect(image_x + x, image_y + y,delt,key1);
  else if(key == ENTER || key == RETURN)
    rect(image_x + x, image_y + y,enter,key1);
  else if(key == ' ')
    rect(image_x + x, image_y + y,key1*6,key1);
  else if(key == CODED) {
    if(keyCode == SHIFT) {
      rect(image_x, image_y + y,tab*3/2,key1);
      rect(image_x + x, image_y + y,tab*11/6,key1);
    }
    else if(keyCode == 20) // CAPS LOCK
      rect(image_x, image_y + y,tab*11/6 - key1,key1);
    else if(keyCode == CONTROL) {
      rect(image_x + x, image_y + y,cntrl,key1);
      rect(image_x + 2*alt + key1*6 + 3*com + cntrl, image_y + y,cntrl,key1);
    }
    else if(keyCode == ALT) {
      rect(image_x + x, image_y + y,alt,key1);
      rect(image_x + x + key1*6 + alt, image_y + y,alt,key1);
    }
    else if(keyCode == 157) {// COMMAND
      rect(image_x + x, image_y + y,com,key1);
      rect(image_x + 2*alt + key1*6 + cntrl + com, image_y + y,com,key1);
    }
  }
  else
    rect(image_x + x, image_y + y,key1,key1);
  //println(image_x+x);
}







