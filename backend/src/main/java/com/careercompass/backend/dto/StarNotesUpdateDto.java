package com.careercompass.backend.dto;

public class StarNotesUpdateDto {

    private String userNotes;

    public StarNotesUpdateDto() {
    }

    public StarNotesUpdateDto(String userNotes) {
        this.userNotes = userNotes;
    }

    public String getUserNotes() {
        return userNotes;
    }

    public void setUserNotes(String userNotes) {
        this.userNotes = userNotes;
    }
}
