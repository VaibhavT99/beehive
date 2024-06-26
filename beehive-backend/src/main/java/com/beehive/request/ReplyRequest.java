package com.beehive.request;

import java.io.Serial;
import java.io.Serializable;

import com.beehive.dto.ReplyDto;

public class ReplyRequest implements Serializable {

    @Serial
    private static final long serialVersionUID = -8300957195016445421L;

    private ReplyDto reply;

    public ReplyDto getReply() {
        return reply;
    }

    public void setReply(ReplyDto reply) {
        this.reply = reply;
    }
}
