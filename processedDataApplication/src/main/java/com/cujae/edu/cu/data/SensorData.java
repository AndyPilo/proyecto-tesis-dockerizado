package com.cujae.edu.cu.data;

public class SensorData {

    private String id;
    private double temperature;
    private double humidity;

    private double conductivity;
    private Long timestamp;

    public SensorData(String id, double temperature, double humidity,double conductivity, Long timestamp) {
        this.id = id;
        this.temperature = temperature;
        this.humidity = humidity;
        this.conductivity = conductivity;
        this.timestamp = timestamp;
    }
    public SensorData(){

    }

    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public double getTemperature() {
        return temperature;
    }
    public void setTemperature(double temperature) {
        this.temperature = temperature;
    }
    public double getHumidity() {
        return humidity;
    }
    public void setHumidity(double humidity) {
        this.humidity = humidity;
    }
    public double getConductivity() {
        return conductivity;
    }
    public void setConductivity(double conductivity) {
        this.conductivity = conductivity;
    }
    public Long getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(Long timestamp) {
        this.timestamp = timestamp;
    }
}