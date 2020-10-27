package GameLogic.Saving;

public class Profiles {

    //attributes
    String name;
    int numberWins;

    public Profiles(String name, int numberWins){
        this.name = name;
        this.numberWins = numberWins;
    }

    public String getName(){
        return name;
    }

    public int getNumberWins(){
        return numberWins;
    }

    public void setName(String name){
        this.name = name;
    }

    public void setNumberWins(int wins){
        this.numberWins = wins;
    }

}
