package com.cujae.edu.cu.data;

public class SensorStats {
    private double totalTemperature;
    private double totalHumidity;
    private int count;

    public SensorStats(double totalTemperature, double totalHumidity, int count) {
        this.totalTemperature = totalTemperature;
        this.totalHumidity = totalHumidity;
        this.count = count;
    }

    public SensorStats() {}

    public double getTotalTemperature() {
        return totalTemperature;
    }
    public double getTotalHumidity() {
        return totalHumidity;
    }
    public int getCount() {
        return count;
    }

    public void setTotalTemperature(double totalTemperature) {
        this.totalTemperature = totalTemperature;
    }

    public void setTotalHumidity(double totalHumidity) {
        this.totalHumidity = totalHumidity;
    }

    public void setCount(int count) {
        this.count = count;
    }

    /******************      Calculos       *****************/
    public double getAverageTemperature() {
        return totalTemperature / count;
    }

    public double getAverageHumidity() {
        return totalHumidity / count;
    }
}