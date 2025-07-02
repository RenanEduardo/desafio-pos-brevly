

export class LinkError extends Error {
 constructor(message: string) {
  super(message);
  this.name = 'LinkError';
 }
}

export class NotFoundError extends LinkError {
 constructor(message: string = 'Link not found') {
  super(message);
  this.name = 'NotFoundError';
 }
}