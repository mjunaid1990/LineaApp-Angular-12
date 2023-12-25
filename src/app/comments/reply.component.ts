import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'reply-comments',
  templateUrl: './reply.component.html',
  styleUrls: ['./comments.component.scss']
})
export class ReplyComponent implements OnInit {

  @Input() comments?: any;

  @Output() replyEvent = new EventEmitter<Number>();

  constructor() { }

  ngOnInit(): void {
  }

  replyChild(id:Number) {
    this.replyEvent.emit(id);
  }
}
