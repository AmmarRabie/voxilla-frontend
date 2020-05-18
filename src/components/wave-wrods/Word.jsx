import React, { useState } from 'react'
import { Badge, Input, Button, Space, Col, Row, Popover, Dropdown, Menu, message } from 'antd'
import { MinusCircleFilled, EditFilled, PlusCircleOutlined, UndoOutlined, SearchOutlined, LoadingOutlined, DownOutlined, DeleteFilled, PlaySquareOutlined, PlayCircleFilled, StopFilled, CheckCircleOutlined, CheckCircleFilled, CheckCircleTwoTone, SelectOutlined } from '@ant-design/icons'
import { gray } from 'color-name'
import { InsideLoading } from 'components/inside-loading'

const Word = ({
    startText = "",
    selectionMode = "none", // select mode used to select more than word and delete them all (from wordList). one of "none", "selected", "not-selected"
    canPlay = true, // canPlay
    selectable = true, // enable or disable the selection action
    playingProgress = 0, // the progress of playing, this can be used to make more awesome styles. If 0 means stopped
    onDeleteWord,
    onAddLeft,
    onAddRight,
    onEdited,
    onSelect,
}) => {


    // states
    const [focus, setFocus] = useState(false)
    const [actionsVisible, setActionsVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [synthesizedText, setSynthesizedText] = useState(startText)
    const [currentText, setCurrentText] = useState(synthesizedText)
    const [loading, setLoading] = useState(false)
    const [status, setStatus] = useState("synthesized") // one of "synthesized", "changed" ("selected" is now determined from isSelected)

    // helpers
    const [onDeleteWordO, onAddLeftO, onAddRightO, onEditedO] = getOptionalCallback(onDeleteWord, onAddLeft, onAddRight, onEdited)
    const isPlaying = playingProgress <= 0
    const isSelected = selectionMode === "selected"


    // callbacks
    const submit = (e) => {

        const { value } = e.target
        if (value === '') {
            onDeleteWordO()
            return
        }
        console.log("enter", value);
        setLoading(true)

        setTimeout((src = "audio/vocals30.mp3") => {
            setLoading(false)
            if (true) { // mimic the return status of the server
                onEditedO(src) // feedback the wav data
                setSynthesizedText(value)
                setCurrentText(value)
                setStatus("synthesized")
            }
            else {
                // server error, or can't synthesis the value
                setStatus("error")
            }
        }, 1000)
        setEditMode(false)
    }

    const undoing = () => {
        setCurrentText(synthesizedText)
        setStatus("synthesized")
    }

    const typing = (e) => {
        const { value } = e.target
        console.log("typing callback triggered with value ", value);
        if (value === synthesizedText) {
            setStatus("synthesized")
        } else {
            setStatus("changed")
        }
        setCurrentText(value)
    }

    const handleMenuActions = (e) => {
        switch (e.key) {
            case "delete":
                onDeleteWordO()
                break;
            default:
                message.info("another action clicked");
        }
    }

    const UndoButton = props => (
        <Button size="small" block type="link" icon={<UndoOutlined />} {...props} />
    )


    // sub-components
    const withBadge = () => (<Badge count={focus && !editMode ? <Button onClick={() => setEditMode(true)} size={"small"} shape="circle" icon={<EditFilled style={{ color: '#f5222d' }} />} hidden={!focus}></Button> : ""}>
        {/* <Input onPressEnter={submit}></Input> */}
        {editMode || <Button block>{synthesizedText}</Button>}
        {editMode && <Input onPressEnter={submit} defaultValue={synthesizedText} />}
    </Badge>)

    const EditableWord = () => (
        <Input placeholder="New word"
            disabled={loading || isSelected}
            value={currentText}
            prefix={<UndoButton onClick={undoing} />}
            addonAfter={loading ? <LoadingOutlined /> : ""}
            onPressEnter={submit}
            onChange={typing}
        />
    )
    // return (
    //     <span onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
    //         <Space >
    //             <AddWordButton onClick={onAddLeftO} hidden={!focus} />
    //             {/* {withBadge()} */}
    //             {/* <Badge count={(focus && !editMode) && <EditBadgeCount onClick={() => setEditMode(true)} hidden={!focus} />}> */}
    //                 {/* <Input onPressEnter={submit}></Input> */}
    //                 {/* {editMode || <Button block>{synthesizedText}</Button>}
    //                 {editMode && <Input onPressEnter={submit} defaultValue={synthesizedText} />} */}
    //             {/* </Badge> */}
    //             <EditableWord />
    //             <AddWordButton onClick={onAddRightO} hidden={!focus} />
    //         </Space>
    //     </span >
    // );

    const menu = (
        <Menu onClick={handleMenuActions}>
            <Menu.Item icon={<PlayCircleFilled />} disabled={!canPlay} key="play">
                Play
            </Menu.Item>
            <Menu.Item icon={<StopFilled />} disabled={playingProgress <= 0} key="stop">
                Stop
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item disabled={!selectable} icon={<SelectOutlined />} key="select">
                Select
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="delete">
                <Button icon={<DeleteFilled />} danger type="link" block>Delete</Button>
            </Menu.Item>
        </Menu>
    );
    const content = menu


    // render logic
    const statusColor = synthesizedText === startText ? "gray" : "#52c41a" // new ones vs old ones colors
    const statusTitle = synthesizedText === startText ? "old word" : "new edited word" // new ones vs old ones colors
    const showAddButtons = focus && selectionMode === "none"

    return (
        <span onMouseOver={() => setFocus(true)} onMouseLeave={() => setFocus(false)}>
            <Space >
                <AddWordButton onClick={onAddLeftO} hidden={!showAddButtons} />
                {/* <Popover content={menu} title="title" >
                    <Input placeholder="New word"
                        disabled={loading || isSelected}
                        value={currentText}
                        prefix={<UndoButton onClick={undoing} />}
                        addonAfter={loading ? <LoadingOutlined /> : ""}
                        onPressEnter={submit}
                        onChange={typing}
                    />
                </Popover > */}
                <InsideLoading progress={playingProgress}>
                    <Dropdown disabled={loading || isSelected} overlay={menu} trigger="contextMenu" visible={actionsVisible} onVisibleChange={setActionsVisible}>
                        <Input placeholder="New word"
                            // disabled={loading || isSelected}
                            value={currentText}
                            prefix={status === "changed" ? <UndoButton onClick={undoing} /> : null}
                            addonAfter={loading ? <LoadingOutlined /> : ""}
                            suffix={<CheckCircleTwoTone twoToneColor={statusColor} title={statusTitle} />}
                            onPressEnter={submit}
                            onChange={typing}
                        />
                    </Dropdown>
                </InsideLoading>
                <AddWordButton onClick={onAddRightO} hidden={!showAddButtons} />
            </Space>
        </span >
    )
}



const EditBadgeCount = props => (
    !props.hidden ? <Button size={"small"} shape="circle" icon={<EditFilled style={{ color: '#f5222d' }} />} {...props} /> : null
)

const AddWordButton = (props) => {
    return (
        <Button size={"small"} shape="circle" icon={<PlusCircleOutlined />} {...props} />
    )
}

const getOptionalCallback = (...callbacks) => (
    callbacks.map(cbk => (
        (...args) => cbk && cbk(...args)
    ))
)

export default Word;