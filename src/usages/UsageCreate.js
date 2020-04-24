import React, { useState } from 'react';
import { Badge, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, withStyles } from '@material-ui/core';
// import { hasPerm } from '../lib/perms.js';
import { useFormInput } from '../lib/forms.js';
import ButtonWithProgress from '../lib/ButtonWithProgress.js';
import PlantSelectField from '../plants/PlantSelectField.js';
import JsxPreviewField from '../lib/JsxPreviewField.js';

function UsageCreate(props) {
  const {classes, plant, environment} = props
  const [lifeNode, setLifeNode] = useState(null)

  const title = useFormInput('')
  const body = useFormInput('')

  console.log(props)

  return <React.Fragment>
    <form>
      <PlantSelectField required environment={environment} onChange={setLifeNode} value={lifeNode} />
      <JsxPreviewField
        environment={environment}
        label="Body"
        fullWidth
        multiline
        required
        {...body}
      />
      <ButtonWithProgress
        type="submit"
        variant="contained"
        color="primary"
        isLoading={true}
      >Salvar</ButtonWithProgress>
    </form>
  </React.Fragment>
}

const styles = (theme) => ({
  marginBottom: {
    marginBottom: theme.spacing(2),
  },
})

export default withStyles(styles)(UsageCreate)
