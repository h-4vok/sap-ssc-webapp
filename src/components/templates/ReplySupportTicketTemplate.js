import React, { PureComponent } from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import withLocalization from '../../localization/withLocalization';
import { SimpleTextField } from '../atoms';
import { ChatBox } from '../molecules';

class ReplySupportTicketTemplateComponent extends PureComponent {
  constructor(props) {
    super(props);

    const { Content } = this.props.reply;

    this.state = { Content };
  }

  onInputChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  cleanAndReply = callback => {
    this.props.reply.Content = this.state.Content;
    this.setState({ Content: '' });
    callback();
  };

  render() {
    const { i10n, conversation, onConfirmReply } = this.props;
    const { Content } = this.state;

    return (
      <Container maxWidth="md">
        <ChatBox id="chatbox" conversation={conversation} />
        <SimpleTextField
          required
          maxLength="8000"
          id="Content"
          name="Content"
          label={i10n['support-ticket.model.content']}
          fullWidth
          value={Content}
          onChange={this.onInputChange}
          multiline
          rows="3"
          rowsMax="3"
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => this.cleanAndReply(onConfirmReply)}
        >
          {i10n['support-ticket.action.reply']}
        </Button>
      </Container>
    );
  }
}

export const ReplySupportTicketTemplate = withLocalization(
  ReplySupportTicketTemplateComponent
);
